/**
* Manager for all UI elements
* 
* @provides
* 	BBB.ui.elements
* 
* @requires
* 	BBB.scaffold
* 	BBB.array
**/

BBB.extend('ui.elements',{

	_elements:[],
	
	createElement:function(type) {
		this._elements[type] = new Array();
		
		var els = BBB.dom.getElementsByClassName(type.publicName);
		var obj = BBB.create(type.className);

		for(i=0;i<els.length;i++) {
			var element = new obj(els[i]);
			element.setup();
			
			this._elements[type].push(els[i]);
		}
	},
	
	newElement:function(publicName,namespace,behaviors,constructor) {
		this.newSubclass('ui.element',publicName,namespace,behaviors,constructor);
	},

	newSubclass:function(parentNamespace,publicName,namespace,behaviors,constructor) {
		BBB.subclass(parentNamespace,namespace,constructor,behaviors);
	},

	parse:function() {
		var self = this;
		BBB.array.forEach(BBB.ui.elements.elementTypes,function(type) {
			
			self._elements[type] = new Array();
			
			var els = BBB.dom.getElementsByClassName(type.publicName);
			var obj = BBB.create(type.className);
			console.log(type.className);

			for(i=0;i<els.length;i++) {
				var element = new obj(els[i]);
				element.setup();
				
				self._elements[type].push(els[i]);
			}
		});
	},
	
	/*
	 * Find all new instances of publicName and bind
	**/
	parseNew:function(publicName) {
		var els = BBB.dom.getElementsByClassName(publicName);
		if(els.length == 0) {
			return;
		}
		
		var self = this;
		
		BBB.array.forEach(BBB.ui.elements.elementTypes,function(type) {
			if(type.publicName == publicName) {
				var obj = BBB.create(type.className);

				for(i=0;i<els.length;i++) {
					if(!BBB.array.inArray(els[i],self._elements)) {
						var element = new obj(els[i]);
						element.setup();
				
						self._elements[type].push(els[i]);
					}
				}
			}
		});
	},
	
	elementTypes:[
		//{ publicName:'sampleHtmlClass', className:'ui.sampleElement'},
	]
});