//@ui5-bundle com/vishnu/DemoSAPUI5/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/vishnu/DemoSAPUI5/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models","./controller/ListSelector","./controller/ErrorHandler"],function(t,e,s,i,o){"use strict";return t.extend("com.vishnu.DemoSAPUI5.Component",{metadata:{manifest:"json"},init:function(){this.oListSelector=new i;this._oErrorHandler=new o(this);this.setModel(s.createDeviceModel(),"device");t.prototype.init.apply(this,arguments);this.getRouter().initialize()},destroy:function(){this.oListSelector.destroy();this._oErrorHandler.destroy();t.prototype.destroy.apply(this,arguments)},getContentDensityClass:function(){if(this._sContentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this._sContentDensityClass=""}else if(!e.support.touch){this._sContentDensityClass="sapUiSizeCompact"}else{this._sContentDensityClass="sapUiSizeCozy"}}return this._sContentDensityClass}})});
},
	"com/vishnu/DemoSAPUI5/controller/App.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("com.vishnu.DemoSAPUI5.controller.App",{onInit:function(){var e,n,o=this.getView().getBusyIndicatorDelay();e=new t({busy:true,delay:0,layout:"OneColumn",previousLayout:"",actionButtonsInfo:{midColumn:{fullScreen:false}}});this.setModel(e,"appView");n=function(){e.setProperty("/busy",false);e.setProperty("/delay",o)};this.getOwnerComponent().getModel().metadataLoaded().then(n);this.getOwnerComponent().getModel().attachMetadataFailed(n);this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
},
	"com/vishnu/DemoSAPUI5/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History"],function(e,t){"use strict";return e.extend("com.vishnu.DemoSAPUI5.controller.BaseController",{getRouter:function(){return this.getOwnerComponent().getRouter()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onNavBack:function(){var e=t.getInstance().getPreviousHash();if(e!==undefined){history.go(-1)}else{this.getRouter().navTo("master",{},true)}}})});
},
	"com/vishnu/DemoSAPUI5/controller/Detail.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/m/library"],function(e,t,o,i){"use strict";var a=i.URLHelper;return e.extend("com.vishnu.DemoSAPUI5.controller.Detail",{formatter:o,onInit:function(){var e=new t({busy:false,delay:0});this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched,this);this.setModel(e,"detailView");this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this))},onSendEmailPress:function(){var e=this.getModel("detailView");a.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))},_onObjectMatched:function(e){var t=e.getParameter("arguments").objectId;this.getModel("appView").setProperty("/layout","TwoColumnsMidExpanded");this.getModel().metadataLoaded().then(function(){var e=this.getModel().createKey("Products",{ProductID:t});this._bindView("/"+e)}.bind(this))},_bindView:function(e){var t=this.getModel("detailView");t.setProperty("/busy",false);this.getView().bindElement({path:e,events:{change:this._onBindingChange.bind(this),dataRequested:function(){t.setProperty("/busy",true)},dataReceived:function(){t.setProperty("/busy",false)}}})},_onBindingChange:function(){var e=this.getView(),t=e.getElementBinding();if(!t.getBoundContext()){this.getRouter().getTargets().display("detailObjectNotFound");this.getOwnerComponent().oListSelector.clearMasterListSelection();return}var o=t.getPath(),i=this.getResourceBundle(),a=e.getModel().getObject(o),n=a.ProductID,r=a.ProductName,s=this.getModel("detailView");this.getOwnerComponent().oListSelector.selectAListItem(o);s.setProperty("/shareSendEmailSubject",i.getText("shareSendEmailObjectSubject",[n]));s.setProperty("/shareSendEmailMessage",i.getText("shareSendEmailObjectMessage",[r,n,location.href]))},_onMetadataLoaded:function(){var e=this.getView().getBusyIndicatorDelay(),t=this.getModel("detailView");t.setProperty("/delay",0);t.setProperty("/busy",true);t.setProperty("/delay",e)},onCloseDetailPress:function(){this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen",false);this.getOwnerComponent().oListSelector.clearMasterListSelection();this.getRouter().navTo("master")},toggleFullScreen:function(){var e=this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen",!e);if(!e){this.getModel("appView").setProperty("/previousLayout",this.getModel("appView").getProperty("/layout"));this.getModel("appView").setProperty("/layout","MidColumnFullScreen")}else{this.getModel("appView").setProperty("/layout",this.getModel("appView").getProperty("/previousLayout"))}}})});
},
	"com/vishnu/DemoSAPUI5/controller/DetailObjectNotFound.controller.js":function(){sap.ui.define(["./BaseController"],function(e){"use strict";return e.extend("com.vishnu.DemoSAPUI5.controller.DetailObjectNotFound",{})});
},
	"com/vishnu/DemoSAPUI5/controller/DetailObjectNotFound.js":function(){sap.ui.define(["./BaseController"],function(e){"use strict";return e.extend("com.vishnu.DemoSAPUI5.controller.DetailObjectNotFound",{})});
},
	"com/vishnu/DemoSAPUI5/controller/ErrorHandler.js":function(){sap.ui.define(["sap/ui/base/Object","sap/m/MessageBox"],function(e,s){"use strict";return e.extend("com.vishnu.DemoSAPUI5.controller.ErrorHandler",{constructor:function(e){this._oResourceBundle=e.getModel("i18n").getResourceBundle();this._oComponent=e;this._oModel=e.getModel();this._bMessageOpen=false;this._sErrorText=this._oResourceBundle.getText("errorText");this._oModel.attachMetadataFailed(function(e){var s=e.getParameters();this._showServiceError(s.response)},this);this._oModel.attachRequestFailed(function(e){var s=e.getParameters();if(s.response.statusCode!=="404"||s.response.statusCode===404&&s.response.responseText.indexOf("Cannot POST")===0){this._showServiceError(s.response)}},this)},_showServiceError:function(e){if(this._bMessageOpen){return}this._bMessageOpen=true;s.error(this._sErrorText,{id:"serviceErrorMessageBox",details:e,styleClass:this._oComponent.getContentDensityClass(),actions:[s.Action.CLOSE],onClose:function(){this._bMessageOpen=false}.bind(this)})}})});
},
	"com/vishnu/DemoSAPUI5/controller/ListSelector.js":function(){sap.ui.define(["sap/ui/base/Object","sap/base/Log"],function(t,e){"use strict";return t.extend("com.vishnu.DemoSAPUI5.controller.ListSelector",{constructor:function(){this._oWhenListHasBeenSet=new Promise(function(t){this._fnResolveListHasBeenSet=t}.bind(this));this.oWhenListLoadingIsDone=new Promise(function(t,e){this._oWhenListHasBeenSet.then(function(n){n.getBinding("items").attachEventOnce("dataReceived",function(){if(this._oList.getItems().length){t({list:n})}else{e({list:n})}}.bind(this))}.bind(this))}.bind(this))},setBoundMasterList:function(t){this._oList=t;this._fnResolveListHasBeenSet(t)},selectAListItem:function(t){this.oWhenListLoadingIsDone.then(function(){var e=this._oList,n;if(e.getMode()==="None"){return}n=e.getSelectedItem();if(n&&n.getBindingContext().getPath()===t){return}e.getItems().some(function(n){if(n.getBindingContext()&&n.getBindingContext().getPath()===t){e.setSelectedItem(n);return true}})}.bind(this),function(){e.warning("Could not select the list item with the path"+t+" because the list encountered an error or had no items")})},clearMasterListSelection:function(){this._oWhenListHasBeenSet.then(function(){this._oList.removeSelections(true)}.bind(this))}})});
},
	"com/vishnu/DemoSAPUI5/controller/Master.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/Sorter","sap/ui/model/FilterOperator","sap/m/GroupHeaderListItem","sap/ui/Device","sap/ui/core/Fragment","../model/formatter"],function(e,t,i,r,s,o,a,n,l){"use strict";return e.extend("com.vishnu.DemoSAPUI5.controller.Master",{formatter:l,onInit:function(){var e=this.byId("list"),t=this._createViewModel(),i=e.getBusyIndicatorDelay();this._oGroupFunctions={UnitPrice:function(e){var t=e.getProperty("UnitPrice"),i,r;if(t<=20){i="LE20";r=this.getResourceBundle().getText("masterGroup1Header1")}else{i="GT20";r=this.getResourceBundle().getText("masterGroup1Header2")}return{key:i,text:r}}.bind(this)};this._oList=e;this._oListFilterState={aFilter:[],aSearch:[]};this.setModel(t,"masterView");e.attachEventOnce("updateFinished",function(){t.setProperty("/delay",i)});this.getView().addEventDelegate({onBeforeFirstShow:function(){this.getOwnerComponent().oListSelector.setBoundMasterList(e)}.bind(this)});this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched,this);this.getRouter().attachBypassed(this.onBypassed,this)},onUpdateFinished:function(e){this._updateListItemCount(e.getParameter("total"))},onSearch:function(e){if(e.getParameters().refreshButtonPressed){this.onRefresh();return}var t=e.getParameter("query");if(t){this._oListFilterState.aSearch=[new i("ProductName",s.Contains,t)]}else{this._oListFilterState.aSearch=[]}this._applyFilterSearch()},onRefresh:function(){this._oList.getBinding("items").refresh()},onOpenViewSettings:function(e){var t="filter";if(e.getSource()instanceof sap.m.Button){var i=e.getSource().getId();if(i.match("sort")){t="sort"}else if(i.match("group")){t="group"}}if(!this.byId("viewSettingsDialog")){n.load({id:this.getView().getId(),name:"com.vishnu.DemoSAPUI5.view.ViewSettingsDialog",controller:this}).then(function(e){this.getView().addDependent(e);e.addStyleClass(this.getOwnerComponent().getContentDensityClass());e.open(t)}.bind(this))}else{this.byId("viewSettingsDialog").open(t)}},onConfirmViewSettingsDialog:function(e){var t=e.getParameters().filterItems,r=[],o=[];t.forEach(function(e){switch(e.getKey()){case"Filter1":r.push(new i("UnitPrice",s.LE,100));break;case"Filter2":r.push(new i("UnitPrice",s.GT,100));break;default:break}o.push(e.getText())});this._oListFilterState.aFilter=r;this._updateFilterBar(o.join(", "));this._applyFilterSearch();this._applySortGroup(e)},_applySortGroup:function(e){var t=e.getParameters(),i,s,o=[];if(t.groupItem){i=t.groupItem.getKey();s=t.groupDescending;var a=this._oGroupFunctions[i];o.push(new r(i,s,a))}i=t.sortItem.getKey();s=t.sortDescending;o.push(new r(i,s));this._oList.getBinding("items").sort(o)},onSelectionChange:function(e){var t=e.getSource(),i=e.getParameter("selected");if(!(t.getMode()==="MultiSelect"&&!i)){this._showDetail(e.getParameter("listItem")||e.getSource())}},onBypassed:function(){this._oList.removeSelections(true)},createGroupHeader:function(e){return new o({title:e.text,upperCase:false})},onNavBack:function(){history.go(-1)},_createViewModel:function(){return new t({isFilterBarVisible:false,filterBarLabel:"",delay:0,title:this.getResourceBundle().getText("masterTitleCount",[0]),noDataText:this.getResourceBundle().getText("masterListNoDataText"),sortBy:"ProductName",groupBy:"None"})},_onMasterMatched:function(){this.getModel("appView").setProperty("/layout","OneColumn")},_showDetail:function(e){var t=!a.system.phone;this.getModel("appView").setProperty("/layout","TwoColumnsMidExpanded");this.getRouter().navTo("object",{objectId:e.getBindingContext().getProperty("ProductID")},t)},_updateListItemCount:function(e){var t;if(this._oList.getBinding("items").isLengthFinal()){t=this.getResourceBundle().getText("masterTitleCount",[e]);this.getModel("masterView").setProperty("/title",t)}},_applyFilterSearch:function(){var e=this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter),t=this.getModel("masterView");this._oList.getBinding("items").filter(e,"Application");if(e.length!==0){t.setProperty("/noDataText",this.getResourceBundle().getText("masterListNoDataWithFilterOrSearchText"))}else if(this._oListFilterState.aSearch.length>0){t.setProperty("/noDataText",this.getResourceBundle().getText("masterListNoDataText"))}},_updateFilterBar:function(e){var t=this.getModel("masterView");t.setProperty("/isFilterBarVisible",this._oListFilterState.aFilter.length>0);t.setProperty("/filterBarLabel",this.getResourceBundle().getText("masterFilterBarText",[e]))}})});
},
	"com/vishnu/DemoSAPUI5/controller/NotFound.controller.js":function(){sap.ui.define(["./BaseController"],function(t){"use strict";return t.extend("com.vishnu.DemoSAPUI5.controller.NotFound",{onInit:function(){this.getRouter().getTarget("notFound").attachDisplay(this._onNotFoundDisplayed,this)},_onNotFoundDisplayed:function(){this.getModel("appView").setProperty("/layout","OneColumn")}})});
},
	"com/vishnu/DemoSAPUI5/i18n/i18n.properties":'# This is the resource bundle for Products\n# __ldi.translation.uuid=\n\n#XTIT: Application name\nappTitle=Products\n\n#YDES: Application description\nappDescription=Sample UI5\n\n#~~~ Master View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Master view title with placeholder for the number of items\nmasterTitleCount=<Products> ({0})\n\n#XTOL: Tooltip for the search field\nmasterSearchTooltip=Enter an <Products> name or a part of it.\n\n#XBLI: text for a list with no data\nmasterListNoDataText=No <ProductsPlural> are currently available\n\n#XBLI: text for a list with no data with filter or search\nmasterListNoDataWithFilterOrSearchText=No matching <ProductsPlural> found\n\n#XSEL: Option to sort the master list by ProductName\nmasterSort1=Sort By <ProductName>\n\n#XSEL: Option to sort the master list by UnitPrice\nmasterSort2=Sort By <UnitPrice>\n\n#XSEL: Option to filter the master list by UnitPrice\nmasterFilterName=<UnitPrice>\n\n#XSEL: Option to not filter the master list\nmasterFilterNone=none\n\n\n#XSEL: Option to filter the master list by  if the value is less than 100\nmasterFilter1=<100 \n\n#XSEL: Option to filter the master list by  if the value is greater than 100\nmasterFilter2=>100 \n\n#YMSG: Filter text that is displayed above the master list\nmasterFilterBarText=Filtered by {0}\n\n#XSEL: Option to not group the master list\nmasterGroupNone=(Not grouped)\n\n#XSEL: Option to group the master list by UnitPrice\nmasterGroup1=<UnitPrice> Group\n\n#XGRP: Group header UnitPrice\nmasterGroup1Header1=<UnitPrice> 20 or less\n\n#XGRP: Group header UnitPrice\nmasterGroup1Header2=<UnitPrice> higher than 20\n\n#~~~ Detail View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTOL: Icon Tab Bar Info\ndetailIconTabBarInfo=Info\n\n#XTOL: Icon Tab Bar Attachments\ndetailIconTabBarAttachments=Attachments\n\n#XTOL: Tooltip text for close column button\ncloseColumn=Close\n\n#XTIT: Send E-Mail subject\nshareSendEmailObjectSubject=<Email subject including object identifier PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0}\n\n#YMSG: Send E-Mail message\nshareSendEmailObjectMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0} (id: {1})\\r\\n{2}\n\n#XBUT: Text for the send e-mail button\nsendEmail=Send E-Mail\n\n#XTIT: Title text for the price\npriceTitle=Price\n\n#~~~ Not Found View ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Not found view title\nnotFoundTitle=Not Found\n\n#YMSG: The Products not found text is displayed when there is no Products with this id\nnoObjectFoundText=This <Products> is not available\n\n#YMSG: The not found text is displayed when there was an error loading the resource (404 error)\nnotFoundText=The requested resource was not found\n\n#~~~ Not Available View ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Master view title\nnotAvailableViewTitle=<Products>\n\n#~~~ Error Handling ~~~~~~~~~~~~~~~~~~~~~~~\n\n#YMSG: Error dialog description\nerrorText=Sorry, a technical error occurred! Please try again later.',
	"com/vishnu/DemoSAPUI5/localService/metadata.xml":'<?xml version="1.0" encoding="utf-8"?><edmx:Edmx Version="1.0"\n\txmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx"><edmx:DataServices m:DataServiceVersion="2.0"\n\t\txmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"><Schema Namespace="Master_Detail" xml:lang="en"\n\t\t\txmlns="http://schemas.microsoft.com/ado/2008/09/edm"><EntityType Name="Object" sap:content-version="1"\n\t\t\t\txmlns:sap="http://www.sap.com/Protocols/SAPData"><Key><PropertyRef Name="ProductID" /></Key><Property Name="ProductID" Type="Edm.String" Nullable="false"\n\t\t\t\t\tMaxLength="40" sap:label="Object ID" sap:creatable="false"\n\t\t\t\t\tsap:updatable="false" /><Property Name="ProductName" Type="Edm.String" Nullable="false"\n\t\t\t\t\tMaxLength="255" sap:label="Name" sap:creatable="false"\n\t\t\t\t\tsap:updatable="false" /><Property Name="Attribute1" Type="Edm.String" Nullable="false"\n\t\t\t\t\tMaxLength="40" sap:label="Attribute1" sap:creatable="false"\n\t\t\t\t\tsap:updatable="false" sap:sortable="false" /><Property Name="Attribute2" Type="Edm.String" Nullable="false"\n\t\t\t\t\tMaxLength="40" sap:label="Attribute2" sap:creatable="false"\n\t\t\t\t\tsap:updatable="false" sap:sortable="false" /><Property Name="" Type="Edm.String" Nullable="false"\n\t\t\t\t\tMaxLength="3" sap:label="Unit of Measure" sap:creatable="false"\n\t\t\t\t\tsap:updatable="false" sap:sortable="false" sap:filterable="false" /><Property Name="UnitPrice" Type="Edm.Decimal" Nullable="false"\n\t\t\t\t\tPrecision="23" Scale="4" sap:label="Unit Number" sap:creatable="false"\n\t\t\t\t\tsap:updatable="false" sap:filterable="false" /><NavigationProperty Name="" Relationship="Master_Detail.FK_Object_LineItems" FromRole="Objects" ToRole="LineItems" /></EntityType><EntityType Name="LineItem" sap:content-version="1"\n\t\t\t\txmlns:sap="http://www.sap.com/Protocols/SAPData"><Key><PropertyRef Name="" /></Key><Property Name="" Type="Edm.String" Nullable="false"\n\t\t\t\t\tMaxLength="40" sap:creatable="false" sap:updatable="false"\n\t\t\t\t\tsap:sortable="false" sap:filterable="false" /><Property Name="ProductID" Type="Edm.String" Nullable="false"\n\t\t\t\t\tMaxLength="40" sap:label="Object ID" sap:creatable="false"\n\t\t\t\t\tsap:updatable="false" /><Property Name="" Type="Edm.String" Nullable="false"\n\t\t\t\t\tsap:creatable="false" sap:updatable="false" sap:sortable="false"\n\t\t\t\t\tsap:filterable="false" /><Property Name="Attribute" Type="Edm.String" Nullable="false"\n\t\t\t\t\tMaxLength="40" sap:creatable="false" sap:updatable="false"\n\t\t\t\t\tsap:sortable="false" sap:filterable="false" /><Property Name="" Type="Edm.String" Nullable="false"\n\t\t\t\t\tMaxLength="3" sap:label="Unit of Measure" sap:creatable="false"\n\t\t\t\t\tsap:updatable="false" sap:sortable="false" sap:filterable="false" /><NavigationProperty Name="Products" Relationship="Master_Detail.FK_Object_LineItems" FromRole="LineItems" ToRole="Objects" /></EntityType><Association Name="FK_Object_LineItems"><End Role="LineItems" Type="Master_Detail.LineItem" Multiplicity="*" /><End Role="Objects" Type="Master_Detail.Object" Multiplicity="1" /><ReferentialConstraint><Principal Role="Objects"><PropertyRef Name="ProductID" /></Principal><Dependent Role="LineItems"><PropertyRef Name="ProductID" /></Dependent></ReferentialConstraint></Association><EntityContainer Name="Master_Detail_ENTITIES"\n\t\t\t\tm:IsDefaultEntityContainer="true"><EntitySet Name="Products" EntityType="Master_Detail.Object"\n\t\t\t\t\tsap:creatable="false" sap:updatable="false" sap:deletable="false"\n\t\t\t\t\tsap:pageable="false" sap:content-version="1"\n\t\t\t\t\txmlns:sap="http://www.sap.com/Protocols/SAPData" /><EntitySet Name=""\n\t\t\t\t\tEntityType="Master_Detail.LineItem"\n\t\t\t\t\tsap:creatable="false" sap:updatable="false" sap:deletable="false"\n\t\t\t\t\tsap:pageable="false" sap:content-version="1"\n\t\t\t\t\txmlns:sap="http://www.sap.com/Protocols/SAPData" /><AssociationSet Name="Master_Detail.FK_Object_LineItems" Association="Master_Detail.FK_Object_LineItems"><End Role="LineItems" EntitySet="" /><End Role="Objects" EntitySet="Products" /></AssociationSet></EntityContainer></Schema></edmx:DataServices></edmx:Edmx>',
	"com/vishnu/DemoSAPUI5/localService/mockserver.js":function(){sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/model/json/JSONModel","sap/base/Log","sap/base/util/UriParameters"],function(e,t,r,a){"use strict";var o,i="com/vishnu/DemoSAPUI5/",n=i+"localService/mockdata";var s={init:function(s){var u=s||{};return new Promise(function(s,c){var p=sap.ui.require.toUrl(i+"manifest.json"),f=new t(p);f.attachRequestCompleted(function(){var t=new a(window.location.href),c=sap.ui.require.toUrl(n),p=f.getProperty("/sap.app/dataSources/mainService"),l=sap.ui.require.toUrl(i+p.settings.localUri),d=/.*\/$/.test(p.uri)?p.uri:p.uri+"/";d=d&&new URI(d).absoluteTo(sap.ui.require.toUrl(i)).toString();if(!o){o=new e({rootUri:d})}else{o.stop()}e.config({autoRespond:true,autoRespondAfter:u.delay||t.get("serverDelay")||500});o.simulate(l,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});var m=o.getRequests();var v=function(e,t,r){r.response=function(r){r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(u.metadataError||t.get("metadataError")){m.forEach(function(e){if(e.path.toString().indexOf("$metadata")>-1){v(500,"metadata Error",e)}})}var g=u.errorType||t.get("errorType"),h=g==="badRequest"?400:500;if(g){m.forEach(function(e){v(h,g,e)})}o.setRequests(m);o.start();r.info("Running the app with mock data");s()});f.attachRequestFailed(function(){var e="Failed to load application manifest";r.error(e);c(new Error(e))})})},getMockServer:function(){return o}};return s});
},
	"com/vishnu/DemoSAPUI5/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"com.vishnu.DemoSAPUI5","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"ach":"set-ach","resources":"resources.json","dataSources":{"mainService":{"uri":"/srv/","type":"OData","settings":{"odataVersion":"2.0","localUri":"localService/metadata.xml"}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.ui":{"technology":"UI5","icons":{"icon":"sap-icon://detail-view","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"com.vishnu.DemoSAPUI5.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.66.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.f":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.vishnu.DemoSAPUI5.i18n.i18n"}},"":{"dataSource":"mainService","preload":true}},"routing":{"config":{"routerClass":"sap.f.routing.Router","viewType":"XML","viewPath":"com.vishnu.DemoSAPUI5.view","controlId":"layout","controlAggregation":"beginColumnPages","bypassed":{"target":"notFound"},"async":true},"routes":[{"pattern":"","name":"master","target":"master"},{"pattern":"Products/{objectId}","name":"object","target":["master","object"]}],"targets":{"master":{"viewName":"Master","viewLevel":1,"viewId":"master"},"object":{"viewName":"Detail","viewId":"detail","viewLevel":1,"controlAggregation":"midColumnPages"},"detailObjectNotFound":{"viewName":"DetailObjectNotFound","viewId":"detailObjectNotFound","controlAggregation":"midColumnPages"},"notFound":{"viewName":"NotFound","viewId":"notFound"}}}}}',
	"com/vishnu/DemoSAPUI5/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{currencyValue:function(e){if(!e){return""}return parseFloat(e).toFixed(2)}}});
},
	"com/vishnu/DemoSAPUI5/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/vishnu/DemoSAPUI5/view/App.view.xml":'<mvc:View\n\tcontrollerName="com.vishnu.DemoSAPUI5.controller.App"\n\tdisplayBlock="true"\n\theight="100%"\n\txmlns="sap.m"\n\txmlns:f="sap.f"\n\txmlns:mvc="sap.ui.core.mvc"><App\n\t\tid="app"\n\t\tbusy="{appView>/busy}"\n\t\tbusyIndicatorDelay="{appView>/delay}"><f:FlexibleColumnLayout\n\t\t\tid="layout"\n\t\t\tlayout="{appView>/layout}"\n\t\t\tbackgroundDesign="Translucent"></f:FlexibleColumnLayout></App></mvc:View>',
	"com/vishnu/DemoSAPUI5/view/Detail.view.xml":'<mvc:View\n\tcontrollerName="com.vishnu.DemoSAPUI5.controller.Detail"\n\txmlns="sap.m"\n\txmlns:semantic="sap.f.semantic"\n\txmlns:mvc="sap.ui.core.mvc"><semantic:SemanticPage\n\t\tid="detailPage"\n\t\tbusy="{detailView>/busy}"\n\t\tbusyIndicatorDelay="{detailView>/delay}"><semantic:titleHeading><Title\n\t\t\t\ttext="{ProductName}"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:headerContent><ObjectAttribute title="{i18n>priceTitle}"/><ObjectNumber\n\t\t\t\tid="objectHeaderNumber"\n\t\t\t\tnumber="{\n\t\t\t\t\tpath: \'UnitPrice\',\n\t\t\t\t\tformatter: \'.formatter.currencyValue\'\n\t\t\t\t}"\n\n\t\t\t/></semantic:headerContent><semantic:content></semantic:content><semantic:sendEmailAction><semantic:SendEmailAction\n\t\t\t\tid="shareEmail"\n\t\t\t\tpress=".onSendEmailPress"/></semantic:sendEmailAction><semantic:closeAction><semantic:CloseAction\n\t\t\t\t\tid="closeColumn"\n\t\t\t\t\tpress=".onCloseDetailPress"/></semantic:closeAction><semantic:fullScreenAction><semantic:FullScreenAction\n\t\t\t\t\tid="enterFullScreen"\n\t\t\t\t\tvisible="{= !${device>/system/phone} &amp;&amp; !${appView>/actionButtonsInfo/midColumn/fullScreen}}"\n\t\t\t\t\tpress=".toggleFullScreen"/></semantic:fullScreenAction><semantic:exitFullScreenAction><semantic:ExitFullScreenAction\n\t\t\t\t\tid="exitFullScreen"\n\t\t\t\t\tvisible="{= !${device>/system/phone} &amp;&amp; ${appView>/actionButtonsInfo/midColumn/fullScreen}}"\n\t\t\t\t\tpress=".toggleFullScreen"/></semantic:exitFullScreenAction></semantic:SemanticPage></mvc:View>',
	"com/vishnu/DemoSAPUI5/view/DetailObjectNotFound.view.xml":'<mvc:View\n\tcontrollerName="com.vishnu.DemoSAPUI5.controller.DetailObjectNotFound"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage\n\t\tid="page"\n\t\ttitle="{i18n>detailTitle}"\n\t\ttext="{i18n>noObjectFoundText}"\n\t\ticon="sap-icon://product"\n\t\tdescription=""\n\t\tshowNavButton="{=\n\t\t\t${device>/system/phone} ||\n\t\t\t${device>/system/tablet} &amp;&amp;\n\t\t\t${device>/orientation/portrait}\n\t\t}"\n\t\tnavButtonPress=".onNavBack"></MessagePage></mvc:View>',
	"com/vishnu/DemoSAPUI5/view/Master.view.xml":'<mvc:View\n\tcontrollerName="com.vishnu.DemoSAPUI5.controller.Master"\n\txmlns="sap.m"\n\txmlns:semantic="sap.f.semantic"\n\txmlns:mvc="sap.ui.core.mvc"><semantic:SemanticPage\n\t\tid="masterPage"\n\t\tpreserveHeaderStateOnScroll="true"\n\t\ttoggleHeaderOnTitleClick="false"><semantic:titleHeading><Title\n\t\t\t\tid="masterPageTitle"\n\t\t\t\ttext="{masterView>/title}"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:content><List\n\t\t\t\tid="list"\n\t\t\t\twidth="auto"\n\t\t\t\tclass="sapFDynamicPageAlignContent"\n\t\t\t\titems="{\n\t\t\t\t\tpath: \'/Products\',\n\t\t\t\t\tsorter: {\n\t\t\t\t\t\tpath: \'ProductName\',\n\t\t\t\t\t\tdescending: false\n\t\t\t\t\t},\n\t\t\t\t\tgroupHeaderFactory: \'.createGroupHeader\'\n\t\t\t\t}"\n\t\t\t\tbusyIndicatorDelay="{masterView>/delay}"\n\t\t\t\tnoDataText="{masterView>/noDataText}"\n\t\t\t\tmode="{= ${device>/system/phone} ? \'None\' : \'SingleSelectMaster\'}"\n\t\t\t\tgrowing="true"\n\t\t\t\tgrowingScrollToLoad="true"\n\t\t\t\tupdateFinished=".onUpdateFinished"\n\t\t\t\tselectionChange=".onSelectionChange"><infoToolbar><Toolbar\n\t\t\t\t\t\tactive="true"\n\t\t\t\t\t\tid="filterBar"\n\t\t\t\t\t\tvisible="{masterView>/isFilterBarVisible}"\n\t\t\t\t\t\tpress=".onOpenViewSettings"><Title\n\t\t\t\t\t\t\tid="filterBarLabel"\n\t\t\t\t\t\t\ttext="{masterView>/filterBarLabel}"\n\t\t\t\t\t\t\tlevel="H3"/></Toolbar></infoToolbar><headerToolbar><OverflowToolbar><SearchField\n\t\t\t\t\t\t\tid="searchField"\n\t\t\t\t\t\t\tshowRefreshButton="true"\n\t\t\t\t\t\t\ttooltip="{i18n>masterSearchTooltip}"\n\t\t\t\t\t\t\tsearch=".onSearch"\n\t\t\t\t\t\t\twidth="auto"><layoutData><OverflowToolbarLayoutData\n\t\t\t\t\t\t\t\t\tminWidth="150px"\n\t\t\t\t\t\t\t\t\tmaxWidth="240px"\n\t\t\t\t\t\t\t\t\tshrinkable="true"\n\t\t\t\t\t\t\t\t\tpriority="NeverOverflow"/></layoutData></SearchField><ToolbarSpacer/><Button\n\t\t\t\t\t\t\tid="sortButton"\n\t\t\t\t\t\t\tpress=".onOpenViewSettings"\n\t\t\t\t\t\t\ticon="sap-icon://sort"\n\t\t\t\t\t\t\ttype="Transparent"/><Button\n\t\t\t\t\t\t\tid="filterButton"\n\t\t\t\t\t\t\tpress=".onOpenViewSettings"\n\t\t\t\t\t\t\ticon="sap-icon://filter"\n\t\t\t\t\t\t\ttype="Transparent"/><Button\n\t\t\t\t\t\t\tid="groupButton"\n\t\t\t\t\t\t\tpress=".onOpenViewSettings"\n\t\t\t\t\t\t\ticon="sap-icon://group-2"\n\t\t\t\t\t\t\ttype="Transparent"/></OverflowToolbar></headerToolbar><items><ObjectListItem\n\t\t\t\t\t\ttype="Navigation"\n\t\t\t\t\t\tpress=".onSelectionChange"\n\t\t\t\t\t\ttitle="{ProductName}"\n\t\t\t\t\t\tnumber="{\n\t\t\t\t\t\t\tpath: \'UnitPrice\',\n\t\t\t\t\t\t\tformatter: \'.formatter.currencyValue\'\n\t\t\t\t\t\t}"\n></ObjectListItem></items></List></semantic:content></semantic:SemanticPage></mvc:View>',
	"com/vishnu/DemoSAPUI5/view/NotFound.view.xml":'<mvc:View\n\tcontrollerName="com.vishnu.DemoSAPUI5.controller.NotFound"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage\n\t\tid="page"\n\t\ttitle="{i18n>notFoundTitle}"\n\t\ttext="{i18n>notFoundText}"\n\t\ticon="sap-icon://document"\n\t\tshowNavButton="true"\n\t\tnavButtonPress=".onNavBack"></MessagePage></mvc:View>',
	"com/vishnu/DemoSAPUI5/view/ViewSettingsDialog.fragment.xml":'<core:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:core="sap.ui.core"><ViewSettingsDialog\n\t\tid="viewSettingsDialog"\n\t\tconfirm=".onConfirmViewSettingsDialog"><sortItems><ViewSettingsItem\n\t\t\t\ttext="{i18n>masterSort1}"\n\t\t\t\tkey="ProductName"\n\t\t\t\tselected="true"/><ViewSettingsItem\n\t\t\t\ttext="{i18n>masterSort2}"\n\t\t\t\tkey="UnitPrice"/></sortItems><filterItems><ViewSettingsFilterItem\n\t\t\t\tid="filterItems"\n\t\t\t\ttext="{i18n>masterFilterName}"\n\t\t\t\tmultiSelect="false"><items><ViewSettingsItem\n\t\t\t\t\t\tid="viewFilter1"\n\t\t\t\t\t\ttext="{i18n>masterFilter1}"\n\t\t\t\t\t\tkey="Filter1"/><ViewSettingsItem\n\t\t\t\t\t\tid="viewFilter2"\n\t\t\t\t\t\ttext="{i18n>masterFilter2}"\n\t\t\t\t\t\tkey="Filter2"/></items></ViewSettingsFilterItem></filterItems><groupItems><ViewSettingsItem\n\t\t\t\ttext="{i18n>masterGroup1}"\n\t\t\t\tkey="UnitPrice"/></groupItems></ViewSettingsDialog></core:FragmentDefinition>'
}});
