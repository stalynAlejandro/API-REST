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
    [TechTalk.SpecRun.FeatureAttribute("ProviderRegistration", Description="       Provider registration scenarios", SourceFile="Features\\v1_0\\ProviderRegistration.feature", SourceLine=0)]
    public partial class ProviderRegistrationFeature
    {
        
        private TechTalk.SpecFlow.ITestRunner testRunner;
        
        private string[] _featureTags = ((string[])(null));
        
#line 1 "ProviderRegistration.feature"
#line hidden
        
        [TechTalk.SpecRun.FeatureInitialize()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Features/v1_0", "ProviderRegistration", "       Provider registration scenarios", ProgrammingLanguage.CSharp, ((string[])(null)));
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
        
        [TechTalk.SpecRun.ScenarioAttribute("New user providing provider data", new string[] {
                "basic"}, SourceLine=4)]
        public virtual void NewUserProvidingProviderData()
        {
            string[] tagsOfScenario = new string[] {
                    "basic"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("New user providing provider data", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
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
    testRunner.Given("1_0 a new user confirmed with (Type:\'ProviderUser\' UserEmail:\'raulaliaga.NewUserP" +
                        "rovidingProviderData@pccom.es\' Password:\',Adios22\' Name:\'Sergio Navarro\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line hidden
#line 7
    testRunner.When("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderData" +
                        "\' Address:\'C\\Bajovento 3\' StateOrProvince:\'Alicante\' Town:\'Elche\' PostalCode:\'03" +
                        "203\' SanitaryMeasures:\'Medida 1, Medida 2\' Image:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 8
    testRunner.Then("1_0 response is Created", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            }
            this.ScenarioCleanup();
        }
        
        [TechTalk.SpecRun.ScenarioAttribute("New user providing provider data and updating it", new string[] {
                "basic"}, SourceLine=10)]
        public virtual void NewUserProvidingProviderDataAndUpdatingIt()
        {
            string[] tagsOfScenario = new string[] {
                    "basic"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("New user providing provider data and updating it", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 11
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
#line 12
    testRunner.Given("1_0 a new user confirmed with (Type:\'ProviderUser\' UserEmail:\'raulaliaga.NewUserP" +
                        "rovidingProviderDataAndUpdatingIt@pccom.es\' Password:\',Adios22\' Name:\'Sergio Nav" +
                        "arro\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line hidden
#line 13
    testRunner.And("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderData" +
                        "AndUpdatingIt\' Address:\'C\\Bajovento 3\' StateOrProvince:\'Alicante\' Town:\'Elche\' P" +
                        "ostalCode:\'03203\' SanitaryMeasures:\'Medida 1, Medida 2\' Image:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 14
    testRunner.And("1_0 response is Created", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 15
    testRunner.And("1_0 get user access token", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 16
    testRunner.And("1_0 response is Ok", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 17
    testRunner.And("1_0 start using access token for all requests", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 18
    testRunner.When("1_0 update provider data (TradeName:\'La Majada\' Address:\'C\\Bajovento 3\' StateOrPr" +
                        "ovince:\'Alicante\' Town:\'Elche\' PostalCode:\'03203\' Telephone:\'96546785456\' Sanita" +
                        "ryMeasures:\'Medida 1, Medida 2\' ImageUrl:\'\' Image:\'\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 19
    testRunner.Then("1_0 response is Accepted", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
#line 20
    testRunner.And("1_0 updated provider has same info submitted and is valid", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            }
            this.ScenarioCleanup();
        }
        
        [TechTalk.SpecRun.ScenarioAttribute("New user providing provider data on twice posts should return same provider", new string[] {
                "ignore",
                "basic"}, SourceLine=24)]
        public virtual void NewUserProvidingProviderDataOnTwicePostsShouldReturnSameProvider()
        {
            string[] tagsOfScenario = new string[] {
                    "ignore",
                    "basic"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("New user providing provider data on twice posts should return same provider", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 25
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
#line 26
    testRunner.Given("1_0 a new user confirmed with (Type:\'ProviderUser\' UserEmail:\'raulaliaga.NewUserP" +
                        "rovidingProviderDataOnTwicePostsShouldReturnSameProvider@pccom.es\' Password:\',Ad" +
                        "ios22\' Name:\'Sergio Navarro\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line hidden
#line 27
    testRunner.And("1_0 get user access token", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 28
    testRunner.And("1_0 response is Ok", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 29
    testRunner.And("1_0 start using access token for all requests", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 30
    testRunner.When("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderData" +
                        "OnTwicePostsShouldReturnSameProvider\' Address:\'C\\Bajovento 3\' StateOrProvince:\'A" +
                        "licante\' Town:\'Elche\' PostalCode:\'03203\' SanitaryMeasures:\'Medida 1, Medida 2\' I" +
                        "mage:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 31
    testRunner.And("1_0 response is Created", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 32
    testRunner.And("1_0 backup provider received", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 33
    testRunner.Then("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderData" +
                        "OnTwicePostsShouldReturnSameProvider\' Address:\'C\\Bajovento 3\' StateOrProvince:\'A" +
                        "licante\' Town:\'Elche\' PostalCode:\'03203\' SanitaryMeasures:\'Medida 1, Medida 2\' I" +
                        "mage:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
#line 34
    testRunner.Then("1_0 response is Created", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
#line 35
    testRunner.And("1_0 provider backup is equal to provider received", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            }
            this.ScenarioCleanup();
        }
        
        [TechTalk.SpecRun.ScenarioAttribute("New user providing provider data on twice posts should fail", new string[] {
                "ignore"}, SourceLine=38)]
        public virtual void NewUserProvidingProviderDataOnTwicePostsShouldFail()
        {
            string[] tagsOfScenario = new string[] {
                    "ignore"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("New user providing provider data on twice posts should fail", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 39
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
#line 40
    testRunner.Given("1_0 a new user confirmed with (Type:\'ProviderUser\' UserEmail:\'raulaliaga.NewUserP" +
                        "rovidingProviderDataOnTwicePostsShouldFail@pccom.es\' Password:\',Adios22\' Name:\'S" +
                        "ergio Navarro\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line hidden
#line 41
    testRunner.And("1_0 get user access token", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 42
    testRunner.And("1_0 response is Ok", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 43
    testRunner.And("1_0 start using access token for all requests", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 44
    testRunner.When("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderData" +
                        "OnTwicePostsShouldFail\' Address:\'C\\Bajovento 3\' StateOrProvince:\'Alicante\' Town:" +
                        "\'Elche\' PostalCode:\'03203\' SanitaryMeasures:\'Medida 1, Medida 2\' Image:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 45
    testRunner.When("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderData" +
                        "OnTwicePostsShouldFail\' Address:\'C\\Bajovento 3\' StateOrProvince:\'Alicante\' Town:" +
                        "\'Elche\' PostalCode:\'03203\' SanitaryMeasures:\'Medida 1, Medida 2\' Image:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 46
    testRunner.Then("1_0 response is BadRequest (MessageStartsWith:\'{\"errors\":{\"\":[\"El usuario ya tien" +
                        "e un comercio, no se pudo crear uno nuevo\",\"status\":400\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            }
            this.ScenarioCleanup();
        }
        
        [TechTalk.SpecRun.ScenarioAttribute("New user providing provider invalid data", SourceLine=47)]
        public virtual void NewUserProvidingProviderInvalidData()
        {
            string[] tagsOfScenario = ((string[])(null));
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("New user providing provider invalid data", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 48
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
#line 49
    testRunner.Given("1_0 a new user confirmed with (Type:\'ProviderUser\' UserEmail:\'raulaliaga.NewUserP" +
                        "rovidingProviderInvalidData@pccom.es\' Password:\',Adios22\' Name:\'Sergio Navarro\')" +
                        "", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line hidden
#line 50
    testRunner.When("1_0 provider data is submitted (TradeName:\'\' Address:\'C\\Bajovento 3\' StateOrProvi" +
                        "nce:\'Alicante\' Town:\'Elche\' PostalCode:\'03203\' SanitaryMeasures:\'Medida 1, Medid" +
                        "a 2\' Image:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 51
    testRunner.And("1_0 response is BadRequest (MessageStartsWith:\'{\"errors\":{\"TradeName\":[\"El campo " +
                        "Nombre Comercial es obligatorio.\"]}\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 52
    testRunner.And("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderInva" +
                        "lidData\' Address:\'\' StateOrProvince:\'Alicante\' Town:\'Elche\' PostalCode:\'03203\' S" +
                        "anitaryMeasures:\'Medida 1, Medida 2\' Image:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 53
    testRunner.And("1_0 response is BadRequest (MessageStartsWith:\'{\"errors\":{\"Address\":[\"El campo Di" +
                        "rección es obligatorio.\"]}\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 54
    testRunner.When("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderInva" +
                        "lidData\' Address:\'C\\Bajovento 3\' StateOrProvince:\'\' Town:\'Elche\' PostalCode:\'032" +
                        "03\' SanitaryMeasures:\'Medida 1, Medida 2\' Image:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 55
    testRunner.And("1_0 response is BadRequest (MessageStartsWith:\'{\"errors\":{\"StateOrProvince\":[\"El " +
                        "campo Estado o Provincia es obligatorio.\"]}\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 56
    testRunner.When("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderInva" +
                        "lidData\' Address:\'C\\Bajovento 3\' StateOrProvince:\'Alicante\' Town:\'\' PostalCode:\'" +
                        "03203\' SanitaryMeasures:\'Medida 1, Medida 2\' Image:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 57
    testRunner.And("1_0 response is BadRequest (MessageStartsWith:\'{\"errors\":{\"Town\":[\"El campo Pobla" +
                        "ción es obligatorio.\"]}\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 58
    testRunner.When("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderInva" +
                        "lidData\' Address:\'C\\Bajovento 3\' StateOrProvince:\'Alicante\' Town:\'Elche\' PostalC" +
                        "ode:\'\' SanitaryMeasures:\'Medida 1, Medida 2\' Image:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 59
    testRunner.And("1_0 response is BadRequest (MessageStartsWith:\'{\"errors\":{\"PostalCode\":[\"El campo" +
                        " Código Postal es obligatorio.\"]},\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
#line 60
    testRunner.When("1_0 provider data is submitted (TradeName:\'La Majada NewUserProvidingProviderInva" +
                        "lidData\' Address:\'C\\Bajovento 3\' StateOrProvince:\'Alicante\' Town:\'Elche\' PostalC" +
                        "ode:\'03203\' SanitaryMeasures:\'Medida 1, Medida 2\' Image:\'(.*)\')", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 61
    testRunner.And("1_0 response is Created", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line hidden
            }
            this.ScenarioCleanup();
        }
        
        [TechTalk.SpecRun.ScenarioAttribute("New user providing provider data and sending invitations to other users that acce" +
            "pt invitation", new string[] {
                "ignore"}, SourceLine=63)]
        public virtual void NewUserProvidingProviderDataAndSendingInvitationsToOtherUsersThatAcceptInvitation()
        {
            string[] tagsOfScenario = new string[] {
                    "ignore"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("New user providing provider data and sending invitations to other users that acce" +
                    "pt invitation", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 64
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
            }
            this.ScenarioCleanup();
        }
        
        [TechTalk.SpecRun.ScenarioAttribute("Admin user updating provider data", new string[] {
                "ignore"}, SourceLine=66)]
        public virtual void AdminUserUpdatingProviderData()
        {
            string[] tagsOfScenario = new string[] {
                    "ignore"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Admin user updating provider data", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 67
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
            }
            this.ScenarioCleanup();
        }
        
        [TechTalk.SpecRun.ScenarioAttribute("Admin user updating provider with invalid data", new string[] {
                "ignore"}, SourceLine=69)]
        public virtual void AdminUserUpdatingProviderWithInvalidData()
        {
            string[] tagsOfScenario = new string[] {
                    "ignore"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Admin user updating provider with invalid data", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 70
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
            }
            this.ScenarioCleanup();
        }
        
        [TechTalk.SpecRun.ScenarioAttribute("Not admin user updating provider data", new string[] {
                "ignore"}, SourceLine=72)]
        public virtual void NotAdminUserUpdatingProviderData()
        {
            string[] tagsOfScenario = new string[] {
                    "ignore"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Not admin user updating provider data", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 73
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
            }
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
