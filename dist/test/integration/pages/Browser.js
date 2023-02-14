sap.ui.define(["sap/ui/test/Opa5"],function(t){"use strict";t.createPageObjects({onTheBrowserPage:{actions:{iChangeTheHashToObjectN:function(e){return this.waitFor(this.createAWaitForAnEntitySet({entitySet:"Objects",success:function(s){t.getHashChanger().setHash("/Products/"+s[e].ProductID)}}))},iChangeTheHashToTheRememberedItem:function(){return this.waitFor({success:function(){var e=this.getContext().currentItem.id;t.getHashChanger().setHash("/Products/"+e)}})},iChangeTheHashToSomethingInvalid:function(){return this.waitFor({success:function(){t.getHashChanger().setHash("/somethingInvalid")}})}},assertions:{iShouldSeeTheHashForObjectN:function(e){return this.waitFor(this.createAWaitForAnEntitySet({entitySet:"Objects",success:function(s){var r=t.getHashChanger(),a=r.getHash();t.assert.strictEqual(a,"Products/"+s[e].ProductID,"The Hash is correct")}}))},iShouldSeeTheHashForTheRememberedObject:function(){return this.waitFor({success:function(){var e=this.getContext().currentItem.id,s=t.getHashChanger(),r=s.getHash();t.assert.strictEqual(r,"Products/"+e,"The Hash is not correct")}})},iShouldSeeAnEmptyHash:function(){return this.waitFor({success:function(){var e=t.getHashChanger(),s=e.getHash();t.assert.strictEqual(s,"","The Hash should be empty")},errorMessage:"The Hash is not Correct!"})}}}})});