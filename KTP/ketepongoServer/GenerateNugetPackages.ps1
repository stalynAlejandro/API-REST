$yesSqlRevision = 6
$orchardRevision = 9

cd yessql
Get-ChildItem *.nupkg -Recurse| foreach { Remove-Item -Path $_.FullName }
dotnet clean YesSql.sln
dotnet restore /p:VersionSuffix=rc1.private.$yesSqlRevision
dotnet build --configuration Release
# dotnet restore /p:VersionSuffix=rc1.private.$yesSqlRevision
# dotnet pack --configuration Release /p:VersionSuffix=rc1.private.$yesSqlRevision
# dotnet restore /p:VersionSuffix=rc1.private.$yesSqlRevision
dotnet pack --configuration Release /p:VersionSuffix=rc1.private.$yesSqlRevision
cd..
cd Orchard2
Get-ChildItem *.nupkg -Recurse| foreach { Remove-Item -Path $_.FullName }
dotnet clean OrchardCore.sln
dotnet restore /p:VersionSuffix=rc1.private.$orchardRevision OrchardCore.sln
dotnet build --configuration Release OrchardCore.sln
# dotnet restore /p:VersionSuffix=rc1.private.$orchardRevision OrchardCore.sln
# dotnet pack --configuration Release /p:VersionSuffix=rc1.private.$orchardRevision OrchardCore.sln
# dotnet restore /p:VersionSuffix=rc1.private.$orchardRevision OrchardCore.sln
dotnet pack --configuration Release /p:VersionSuffix=rc1.private.$orchardRevision OrchardCore.sln
cd..

$pwd = Read-Host -Prompt 'Compilation Finished. Ready For Upload. Enter user pwd: '

cd yessql
nuget.exe sources Remove -Name "KeTePongoOrchardCore" 
nuget.exe sources Add -Name "KeTePongoOrchardCore" -Source "https://pkgs.dev.azure.com/ketepongo/KTP/_packaging/KeTePongoOrchardCore/nuget/v3/index.json" -username jersio@hotmail.com -password $pwd
Get-ChildItem -Recurse -File *.nupkg | Foreach {dotnet nuget push --source "KeTePongoOrchardCore" --api-key KeTePongo $_.FullName }
cd ..
cd Orchard2
nuget.exe sources Remove -Name "KeTePongoOrchardCore" 
nuget.exe sources Add -Name "KeTePongoOrchardCore" -Source "https://pkgs.dev.azure.com/ketepongo/KTP/_packaging/KeTePongoOrchardCore/nuget/v3/index.json" -username jersio@hotmail.com -password $pwd
Get-ChildItem -Recurse -File *.nupkg | Foreach {dotnet nuget push --source "KeTePongoOrchardCore" --api-key KeTePongo $_.FullName }
nuget.exe sources Remove -Name "KeTePongoOrchardCore" 
cd ..

