﻿// ------------------------------------------------------------------------------
//  <auto-generated>
//      This code was generated by SpecFlow (https://www.specflow.org/).
//      SpecFlow Version:3.6.0.0
//      SpecFlow Generator Version:3.6.0.0
// 
//      Changes to this file may cause incorrect behavior and will be lost if
//      the code is regenerated.
//  </auto-generated>
// ------------------------------------------------------------------------------
#region Designer generated code
#pragma warning disable
namespace KeTePongoServer.Spec.Features.V1_0
{
    using TechTalk.SpecFlow;
    using System;
    using System.Linq;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("TechTalk.SpecFlow", "3.6.0.0")]
    [System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [TechTalk.SpecRun.FeatureAttribute("ProviderERPManagingClients", Description="       Provider ERP managing clients", SourceFile="Features\\v1_0\\ProviderERPManagingClients.feature", SourceLine=0)]
    public partial class ProviderERPManagingClientsFeature
    {
        
        private TechTalk.SpecFlow.ITestRunner testRunner;
        
        private string[] _featureTags = ((string[])(null));
        
#line 1 "ProviderERPManagingClients.feature"
#line hidden
        
        [TechTalk.SpecRun.FeatureInitialize()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Features/v1_0", "ProviderERPManagingClients", "       Provider ERP managing clients", ProgrammingLanguage.CSharp, ((string[])(null)));
            testRunner.OnFeatureStart(featureInfo);
        }
        
        [TechTalk.SpecRun.FeatureCleanup()]
        public virtual void FeatureTearDown()
        {
            testRunner.OnFeatureEnd();
            testRunner = null;
        }
        
        public virtual void TestInitialize()
        {
        }
        
        [TechTalk.SpecRun.ScenarioCleanup()]
        public virtual void TestTearDown()
        {
            testRunner.OnScenarioEnd();
        }
        
        public virtual void ScenarioInitialize(TechTalk.SpecFlow.ScenarioInfo scenarioInfo)
        {
            testRunner.OnScenarioInitialize(scenarioInfo);
        }
        
        public virtual void ScenarioStart()
        {
            testRunner.OnScenarioStart();
        }
        
        public virtual void ScenarioCleanup()
        {
            testRunner.CollectScenarioErrors();
        }
        
        [TechTalk.SpecRun.ScenarioAttribute("Adding a new provider as ERP", new string[] {
                "basic"}, SourceLine=4)]
        public virtual void AddingANewProviderAsERP()
        {
            string[] tagsOfScenario = new string[] {
                    "basic"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Adding a new provider as ERP", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 5
this.ScenarioInitialize(scenarioInfo);
#line hidden
            bool isScenarioIgnored = default(bool);
            bool isFeatureIgnored = default(bool);
            if ((tagsOfScenario != null))
            {
                isScenarioIgnored = tagsOfScenario.Where(__entry => __entry != null).Where(__entry => String.Equals(__entry, "ignore", StringComparison.CurrentCultureIgnoreCase)).Any();
            }
            if ((this._featureTags != null))
            {
                isFeatureIgnored = this._featureTags.Where(__entry => __entry != null).Where(__entry => String.Equals(__entry, "ignore", StringComparison.CurrentCultureIgnoreCase)).Any();
            }
            if ((isScenarioIgnored || isFeatureIgnored))
            {
                testRunner.SkipScenario();
            }
            else
            {
                this.ScenarioStart();
#line 6
    testRunner.Given(@"1_0 a new provider with (UserEmail:'raulaliaga.AddingANewProviderERP@pccom.es' Password:',Adios22' Name:'Sergio Navarro' TradeName:'La Majada AddingANewCatalogProduct' Address:'C\Bajovento 3' StateOrProvince:'Alicante' Town:'Elche' PostalCode:'03203' Telephone:'235345' SanityMeasures:'Lavado de manos' Image:'')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line hidden
#line 7
    testRunner.And("1_0 get admin user access token", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 8
    testRunner.And("1_0 response is Ok", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 9
    testRunner.And("1_0 start using access token for all requests", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 10
    testRunner.And("1_0 a new OauthApp request (ClientId:\'OauthAppTestERPManagingClients\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 11
    testRunner.And("1_0 response is Ok", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 12
    testRunner.And("1_0 a link from OAuthApp to provider request (ClientId:\'OauthAppTestERPManagingCl" +
                        "ients\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 13
    testRunner.Then("1_0 response is Ok", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
#line 14
    testRunner.And("1_0 get access token for user (userName: \'raulaliaga.AddingANewProviderERP\' passw" +
                        "ord: \',Adios22\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 15
    testRunner.And("1_0 response is Ok", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 16
    testRunner.And("1_0 start using access token for all requests", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 17
    testRunner.And("1_0 provider has now LinkedToERP true and catalog is private", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 18
    testRunner.When("1_0 get OAuthApp access token (ClientId:\'OauthAppTestERPManagingClients\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 19
    testRunner.And("1_0 start using access token for all requests", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
                TechTalk.SpecFlow.Table table22 = new TechTalk.SpecFlow.Table(new string[] {
                            "Address",
                            "BussinessName",
                            "Country",
                            "Email",
                            "ERPId",
                            "PostalCode",
                            "StateOrProvince",
                            "Telephone",
                            "Town",
                            "TradeName"});
                table22.AddRow(new string[] {
                            "calle falsa 123",
                            "La Majada",
                            "España",
                            "lamajada@lamajada.es",
                            "1",
                            "02005",
                            "Valencia",
                            "000600600",
                            "Valencia",
                            "La Majada"});
                table22.AddRow(new string[] {
                            "calle verdadera 123",
                            "La Majada Quesos",
                            "España",
                            "lamajadaquesos@lamajadaquesos.es",
                            "2",
                            "01005",
                            "Valencia",
                            "100600600",
                            "Valencia",
                            "La Majada Quesos"});
                table22.AddRow(new string[] {
                            "avenida falsa 123",
                            "La Majada Tienda",
                            "España",
                            "lamajadatienda@lamajadatienda.es",
                            "3",
                            "00004",
                            "Valencia",
                            "200600600",
                            "Valencia",
                            "La Majada Tienda"});
#line 20
    testRunner.And("1_0 a new Provider LinkedToERP put ERPClientsPortfolio request", ((string)(null)), table22, "And ");
#line hidden
#line 25
    testRunner.Then("1_0 response is Ok", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            }
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
