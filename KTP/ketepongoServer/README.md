# KeTePongo Server

## Solutions
There are 3 ways of running/debuging KeTePongo Server:
- KeTePongoServer.sln: It runs the server with dependencies on OrchardCore and YesSql as nuget packages
- /Orchard2/OrchardCore.sln: It allows to debug OrchardCore code. It runs the server with Orchard dependency pointing to its source code and YesSql as nuget packages
- /Orchard2/OrchardCoreYesSql.sln: It allows to debug OrchardCore and YesSql code. It runs the server with Orchard and yessql source code.

## Consuming Nuget packages repository

We usually prefer to use the default Orchard package repositories:
- dev package store: https://www.myget.org/F/orchardcore-dev/ (for their nightly builds)
- pre package store: https://www.myget.org/F/orchardcore-preview/api/v3/index.json
And YesSql repository at default nuget repo.

However, when we need some changes on source core and don't want to wait for a PR accepted on official orchard core or yessql github repos, we generate our own packages in our own private repo.

This is our private Nuget repo where we store our private versions of OrchardCore and YesSql:
https://pkgs.dev.azure.com/ketepongo/KTP/_packaging/KeTePongoOrchardCore/nuget/v3/index.json

You need your visual studio user has permissions to access to this Azure-DevOps repo. Ask Sergio for this permissions

Versions published at this repo always has the name of the original version of the OrchardCore or YesSql from which we made our changes, and a postfix `.version.X` where X is our internal version number

For example currently we have this package version for our custom Orchard packages `1.0.0-rc1.private.8` and this one for the YesSql ones `2.0.0-rc1.private.5`

When we want to use our own packages from ketepongo projects we change references in our csprjs to the packages in the repository we want.

When we want to use our own YesSql packages within /Orchard2/OrchardCore.sln we change it at \Orchard2\src\OrchardCore.Build the versions of the yessql dependencies.

## Subrepos

- /orchard2 folder: subrepo of our OrchardCore fork. 
- /yessql folder: subrepo of our YesSql fork

They should point to the same commit where the nuget references used by KeTePongoServer.sln were generated. It will help us to be sure any behavior you experience on nuget dependencies can be debugued at with Orchard and YesSql code on the proper sln.

When we want to change the source of OrchardCore used for debuguing with /Orchard2/OrchardCore.sln we checkout the subrepo Orchard2 to the branch we are interested in.

When we want to change the source of YesSql used for debuguing with /Orchard2/OrchardCoreYesSql.sln we checkout the subrepo yessql to the branch we are interested in.

When we commit changes on main repo we should take core of left submodules pointing to the commit used to generate the nuget images we use as dependencies.


## Branches

In Yessql and OrchardCore subrepos there is a dev_packages  branch that should point always to the last package we generate for each one of them.
Furthermore we have to add a tag with the private version we generated at the commit when we generated a package.

As soon as Orchard guys accept our PRs we will come back to Orchard and YesSql official packages, and dev_packages branch will stay at our last custom package.
Then we will checkout subrepos to the commit that fits with the package version we are using of OrchardCore and Yessql.

## Generating Nuget packages repository

For generating packages for yessql you need to execute the script at the root of both submodules called GenerateNugetPackages.ps1
It restores depencies, compiles, creates packages and publishes them to our private repo.

Currently this script is based on a token that allows to write and read.

On next commits we will remove this token for security reasons and packages will be generated at Azure Dev Ops without the need of having a token with write permissions.

## Azure Blob Storage
In order to use the client app with images we'll need to add some environment variables (on Windows) to our PC otherwise we'll get an exception if we try to upload an image (eg: creating a commerce with an image).

We need to create 3 variables "AzureStorageAccountKey",  "AzureStorageAccountName" and "AzureStorageContainerName"

The values for all of them can be checked inside "ktpca"/containers, storage account in azure, inside the resource group "ktpRecursos"

Heads up! for development you should use  "ktpmediatest", "ktpmedia" is for production only.
