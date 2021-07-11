set MSBUILDSINGLELOADCONTEXT=1
cd KeTePongoServer.Spec
dotnet watch test KeTePongoServer.Spec --no-restore 
dotnet test KeTePongoServer.UnitTesting --no-restore
REM --filter (Name~AddingACarteProductWithAnExistingSection) | (Name~TestMethod2)
REM https://docs.microsoft.com/es-es/dotnet/core/tools/dotnet-test#filter-option-details