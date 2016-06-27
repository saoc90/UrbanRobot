#***********************************************************************
 
<#
NOTES
-------------------------
Name: sysventory
Author: Marko Kartelo
Version: 1.0.0
DateCreated: 2016-05-01
DateUpdated: 2016-06-07


THIRDPARTY SCRIPTS
-------------------------
- Function GET-RemoteProgram (Modified/Extended by Marko Kartelo)
  Source: https://gallery.technet.microsoft.com/scriptcenter/Get-RemoteProgram-Get-list-de9fd2b4/view/Discussions#content


#>


#***********************************************************************



#Functions:

##### Get-Inventory ######

Function Get-Inventory($name, $sid) {
	PROCESS {
                   
        $cpu = gwmi Win32_Processor -comp $name | Select Name,Manufacturer,NumberOfLogicalProcessors,MaxClockSpeed
		$os = gwmi Win32_OperatingSystem -comp $name | Select CSName,BuildNumber,ServicePackMajorVersion,OSArchitecture,Caption
        #$applications = gwmi Win32_Product -comp $name | Select Name, Version
        $applications = Get-RemoteProgram -ComputerName $name | Select-Object ProgramName, ProgramVersion
        $printers = gwmi Win32_Printer -comp $name | Select Name,DriverName
        $nics = gwmi Win32_NetworkAdapterConfiguration -comp $name -Filter 'ipenabled = "true"'
        $ram = (Get-WmiObject Win32_PhysicalMemory -comp $name| measure-object Capacity -sum).sum/1gb

        #Start Global Node
		$xmlWriter.WriteStartElement('client')
		$xmlWriter.WriteAttributeString('SID', $sid)
        
        $xmlWriter.WriteElementString('name', $name)
        $xmlWriter.WriteElementString('RAM', $ram)
        
        #Start CPU Node
        $xmlWriter.WriteStartElement('CPU')
        $xmlWriter.WriteElementString('Manufacturer', $cpu.Manufacturer)
        $xmlWriter.WriteElementString('Model', $cpu.Name)
        $xmlWriter.WriteElementString('Cores', $cpu.NumberOfLogicalProcessors)
        $xmlWriter.WriteElementString('Clockspeed', $cpu.MaxClockSpeed)
        #End CPU Node
        $xmlWriter.WriteEndElement()

        #Start OS Node
        $xmlWriter.WriteStartElement('OS')
        $xmlWriter.WriteElementString('Name', $os.Caption)
        $xmlWriter.WriteElementString('Architecture', $os.OSArchitecture)
		$xmlWriter.WriteElementString('Build', $os.BuildNumber)
        $xmlWriter.WriteElementString('ServicePack', $os.ServicePackMajorVersion)
        #End OS Node
        $xmlWriter.WriteEndElement()

        #Start Applications Node
        $xmlWriter.WriteStartElement('Applications')    		
        ForEach($appl in $applications)
        {
            $xmlWriter.WriteStartElement('App')
            #$xmlWriter.WriteAttributeString('name', $appl.Name)
            $xmlWriter.WriteAttributeString('name', $appl.ProgramName)
            #$xmlWriter.WriteElementString('Version', $appl.Version)
            $xmlWriter.WriteAttributeString('version', $appl.ProgramVersion)
            $xmlWriter.WriteEndElement()
        }
        #End Applications Node
        $xmlWriter.WriteEndElement()

        #Start Printers Node
        $xmlWriter.WriteStartElement('Printers')
        ForEach($printer in $printers)
        {
            $xmlWriter.WriteStartElement('Printer')
            $xmlWriter.WriteAttributeString('name', $printer.Name)
            $xmlWriter.WriteElementString('driver', $printer.DriverName)
            $xmlWriter.WriteEndElement()
        }
        #End Printers Node
        $xmlWriter.WriteEndElement()

         #Start Nics Node
        $xmlWriter.WriteStartElement('Nics')
        ForEach($nic in $nics)
        {
            $xmlWriter.WriteStartElement('NIC')
            $xmlWriter.WriteAttributeString('id', $nic.InterfaceIndex)
            $xmlWriter.WriteElementString('Descr', $nic.Description)
            $xmlWriter.WriteElementString('MAC-Addr', $nic.MacAddress)
            $xmlWriter.WriteElementString('IPv4', $nic.IPAddress[0])
            $xmlWriter.WriteElementString('SubnetV4', $nic.IPSubnet[0])
            $xmlWriter.WriteElementString('IPv6', $nic.IPAddress[1])
            $xmlWriter.WriteElementString('SubnetV6', $nic.IPSubnet[1])
            $xmlWriter.WriteElementString('Gateway', $nic.DefaultIPGateway)
            $xmlWriter.WriteElementString('DHCP', $nic.DHCPEnabled)
            $xmlWriter.WriteEndElement()
        }
        #End Nics Node
        $xmlWriter.WriteEndElement()

        #End Global Node
        $xmlWriter.WriteEndElement()
	}
}

###### End of GET-Inventory #########

##### Get-RemoteProgram ######

#Source: https://gallery.technet.microsoft.com/scriptcenter/Get-RemoteProgram-Get-list-de9fd2b4/view/Discussions#content

#Extended by Marko Kartelo:
# - returns in addition the DisplayVersion (softwareversion) value

Function Get-RemoteProgram {
<#
.Synopsis
Generates a list of installed programs on a computer

.DESCRIPTION
This function generates a list by querying the registry and returning the installed programs of a local or remote computer.

.NOTES   
Name: Get-RemoteProgram
Author: Jaap Brasser
Version: 1.2.1
DateCreated: 2013-08-23
DateUpdated: 2015-02-28
Blog: http://www.jaapbrasser.com

.LINK
http://www.jaapbrasser.com

.PARAMETER ComputerName
The computer to which connectivity will be checked

.PARAMETER Property
Additional values to be loaded from the registry. Can contain a string or an array of string that will be attempted to retrieve from the registry for each program entry

.EXAMPLE
Get-RemoteProgram

Description:
Will generate a list of installed programs on local machine

.EXAMPLE
Get-RemoteProgram -ComputerName server01,server02

Description:
Will generate a list of installed programs on server01 and server02

.EXAMPLE
Get-RemoteProgram -ComputerName Server01 -Property DisplayVersion,VersionMajor

Description:
Will gather the list of programs from Server01 and attempts to retrieve the displayversion and versionmajor subkeys from the registry for each installed program

.EXAMPLE
'server01','server02' | Get-RemoteProgram -Property Uninstallstring

Description
Will retrieve the installed programs on server01/02 that are passed on to the function through the pipeline and also retrieves the uninstall string for each program
#>
    [CmdletBinding(SupportsShouldProcess=$true)]
    param(
        [Parameter(ValueFromPipeline=$true,
            ValueFromPipelineByPropertyName=$true,
            Position=0)]
        [string[]]
            $ComputerName = $env:COMPUTERNAME,
        [Parameter(Position=0)]
        [string[]]$Property 
    )

    begin {
        $RegistryLocation = 'SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\',
                            'SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\'
        $HashProperty = @{}
        $SelectProperty = @('ProgramName','ProgramVersion','ComputerName')
        if ($Property) {
            $SelectProperty += $Property
        }
    }

    process {
        foreach ($Computer in $ComputerName) {
            $RegBase = [Microsoft.Win32.RegistryKey]::OpenRemoteBaseKey([Microsoft.Win32.RegistryHive]::LocalMachine,$Computer)
            foreach ($CurrentReg in $RegistryLocation) {
                if ($RegBase) {
                    $CurrentRegKey = $RegBase.OpenSubKey($CurrentReg)
                    if ($CurrentRegKey) {
                        $CurrentRegKey.GetSubKeyNames() | ForEach-Object {
                            if ($Property) {
                                foreach ($CurrentProperty in $Property) {
                                    $HashProperty.$CurrentProperty = ($RegBase.OpenSubKey("$CurrentReg$_")).GetValue($CurrentProperty)
                                }
                            }
                            $HashProperty.ComputerName = $Computer
                            $HashProperty.ProgramName = ($DisplayName = ($RegBase.OpenSubKey("$CurrentReg$_")).GetValue('DisplayName'))
                            $HashProperty.ProgramVersion = ($RegBase.OpenSubKey("$CurrentReg$_")).GetValue('DisplayVersion')
                            if ($DisplayName) {
                                New-Object -TypeName PSCustomObject -Property $HashProperty |
                                Select-Object -Property $SelectProperty
                            } 

                        }
                    }
                }
            }
        }
    }
}

###### End of GET-RemoteProgram #########


Import-Module ActiveDirectory

#$xmlWriter = New-Object System.XMl.XmlTextWriter('C:\sysventory\inventory.xml',$Null)
$invocation = (Get-Variable MyInvocation).Value
$directorypath = Split-Path $invocation.MyCommand.Path
$xmlpath = $directorypath + '\inventory.xml'

$xmlWriter = New-Object System.XMl.XmlTextWriter($xmlpath ,$Null)



$xmlWriter.Indentation = 1
$xmlWriter.IndentChar = "`t"
$xmlWriter.WriteStartDocument()

$xmlWriter.WriteComment('TEEEEEEEEEEEEST Inventory')

$xmlWriter.WriteStartElement('Inventory')
$xmlWriter.WriteAttributeString('date', $(Get-Date))
$xmlWriter.WriteStartElement('Clients')


$comps= @(Get-ADComputer -Filter * | select name, sid)

ForEach($comp in $comps){
    Get-Inventory $comp.name $comp.sid
}


$xmlWriter.WriteEndDocument()
$xmlWriter.Flush()
$xmlWriter.Close()




