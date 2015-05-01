angular.module("luci")
.factory('$uci_ex', function($rpc, $rootScope){
	var section_types = {
		"wifi-device": {
			"type": 			{ dvalue: "", type: String },
			"country": 		{ dvalue: "", type: String},
			"band": 			{ dvalue: "none", type: String, allow: [ "a", "b" ] },
			"bandwidth": 	{ dvalue: 0, type: Number },
			"channel":		{ dvalue: "auto", type: String, allow: [ "auto", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ] },
			"scantimer":	{ dvalue: 0, type: Number },
			"wmm":				{ dvalue: false, type: Boolean },
			"wmm_noack":	{ dvalue: false, type: Boolean },
			"wmm_apsd":		{ dvalue: false, type: Boolean },
			"txpower":		{ dvalue: 0, type: Number },
			"rateset":		{ dvalue: "default", type: String, allow: [ "default" ] },
			"frag":				{ dvalue: 0, type: Number },
			"rts":				{ dvalue: 0, type: Number },
			"dtim_period":{ dvalue: 0, type: Number },
			"beacon_int":	{ dvalue: 0, type: Number },
			"rxchainps":	{ dvalue: false, type: Boolean },
			"rxchainps_qt":{dvalue: 0, type: Number },
			"rxchainps_pps":{dvalue: 0, type: Number },
			"rifs":				{ dvalue: false, type: Boolean },
			"rifs_advert":{ dvalue: false, type: Boolean },
			"maxassoc":		{ dvalue: 0, type: Number },
			"doth":				{ dvalue: 0, type: Boolean },
			"hwmode":			{ dvalue: "auto", type: String, allow: [ "auto", "11ac" ] },
			"disabled":		{ dvalue: false, type: Boolean }
		}, 
		"wifi-iface": {
			"device": 		{ dvalue: "wl0", type: String, match: /^wl0|wl1$/ },
			"network":		{ dvalue: "lan", type: String, allow: [ "wan", "lan" ] },
			"mode":				{ dvalue: "ap", type: String, allow: [ "ap" ] },
			"ssid":				{ dvalue: "Inteno", type: String },
			"encryption":	{ dvalue: "mixed-psk", type: String, allow: [ "none", "wpa", "wpa2", "mixed-wpa", "wep-shared", "mixed-psk"] },
			"cipher":			{ dvalue: "auto", type: String, allow: [ "auto" ] },
			"key":				{ dvalue: "", type: String },
			"gtk_rekey":	{ dvalue: false, type: Boolean },
			"wps_pbc":		{ dvalue: false, type: Boolean },
			"wmf_bss_enable":{ dvalue: false, type: Boolean },
			"bss_max":		{ dvalue: 0, type: Number },
			"instance":		{ dvalue: 0, type: Number },
			"up":					{ dvalue: false, type: Boolean },
			"disabled":		{ dvalue: false, type: Boolean },
			"macmode":		{ dvalue: 1, type: Number, allow: [ 0, 1, 2 ] },
			"macfilter":	{ dvalue: false, type: Boolean },
			"maclist":		{ dvalue: [], type: Array, match_each: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/ }
		}, 
		"host": {
			"hostname":		{ dvalue: "", type: String }, 
			"macaddr":		{ dvalue: "", type: String, match: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/ }
		}
	}; 
	function UCI(){
		
	}
	(function(){
		function UCIField(value){
			this.ovalue = value; 
			this.dirty = false; 
			this.uvalue = undefined; 
		}
		UCIField.prototype = {
			get value(){
				return this.uvalue || this.ovalue; 
			},
			set value(val){
				if(!this.dirty && this.ovalue != val) this.dirty = true; 
				this.uvalue = val; 
			}
		}
		UCI.Field = UCIField; 
	})(); 
	(function(){
		
		function UCISection(data){
			var type = section_types[data[".type"]]; 
			var self = this; 
			self[".original"] = data; 
			self[".name"] = data[".name"]; 
			self[".section_type"] = type; 
			if(!type) {
				Object.keys(data).map(function(k){
					if(k.indexOf(".") != 0){
						self[k] = UCI.Field(k); 
					}
				}); 
			} else {
				Object.keys(type).map(function(k){
					if(!(k in data)) { 
						console.log("Field "+k+" missing in data!"); 
						self[k] = new UCI.Field(type[k].dvalue); 
					} else {
						switch(type[k].type){
							case String: self[k] = new UCI.Field(data[k]); break; 
							case Number: self[k] = new UCI.Field(Number(data[k])||type.dvalue);  break; 
							case Array: self[k] = new UCI.Field(data[k]);  break; 
							case Boolean: 
								var value = type.dvalue; 
								if(data[k] == "true" || data[k] == "1") value = true; 
								else if(data[k] == "false" || data[k] == "0") value = false; 
								self[k] = new UCI.Field(value); 
								break; 
							default: 
								self[k] = new UCI.Field(data[k]); 
						}
					}
				}); 
			}
		}
		
		UCISection.prototype.$getChangedValues = function(){
			var type = this[".section_type"]; 
			var self = this; 
			var changed = {}; 
			Object.keys(type).map(function(k){
				if(self[k] && self[k].dirty){
					console.log("Adding dirty field: "+k); 
					changed[k] = self[k].value; 
				}
			}); 
			return changed; 
		}
		UCI.Section = UCISection; 
	})(); 
	(function(){
		function UCIConfig(uci, name){
			this.uci = uci; 
			this[".name"] = name; 
			this["@all"] = []; 
		}
		function _insertSection(self, item){
			var section = new UCI.Section(item); 
			if(!("@"+item[".type"] in self)) self["@"+item[".type"]] = []; 
			self["@"+item[".type"]].push(section); 
			self["@all"].push(section); 
			self[item[".name"]] = section; 
			return section; 
		}
		UCIConfig.prototype.$sync = function(){
			var deferred = $.Deferred(); 
			var self = this; 
			Object.keys(self).map(function(k){
				if(k.indexOf("@") == 0) self[k] = []; 
			}); 
			$rpc.uci.state({
				config: self[".name"]
			}).done(function(data){
				var vals = data.values; 
				Object.keys(vals).map(function(k){
					_insertSection(self, vals[k]); 
				}); 
				deferred.resolve(); 
			}).fail(function(){
				deferred.reject(); 
			}); 
			return deferred.promise(); 
		}
		// set object values on objects that match search criteria 
		// if object does not exist, then create a new object 
		UCIConfig.prototype.set = function(search, values){
			var self = this; 
			self["@all"].map(function(item){
				var match = Object.keys(search).filter(function(x){ item[x] != search[x]; }).length == 0; 
				if(match){
					Object.keys(values).map(function(x){
						item[x].value = values[x]; 
					}); 
				}
			}); 
		}
		// creates a new object that will have values set to values
		UCIConfig.prototype.create = function(item){
			var self = this; 
			if(!(".type" in item)) throw new Error("You must specify '.type' in the item you want to create!"); 
			var type = section_types[item[".type"]]; 
			if(!type) throw Error("Trying to create section of unrecognized type!"); 
			// TODO: validate values!
			var values = {}; 
			Object.keys(type).map(function(k){ 
				if(k in item) values[k] = item[k]; 
				else values[k] = type[k].dvalue; 
			}); 
			var deferred = $.Deferred(); 
			console.log("Adding: "+item[".type"]+": "+JSON.stringify(values)); 
			$rpc.uci.add({
				"config": self[".name"], 
				"type": item[".type"],
				"values": values
			}).done(function(state){
				item[".name"] = state.section; 
				var section = _insertSection(self, item); 
				$rpc.uci.commit({
					config: self[".name"]
				}).always(function(){
					deferred.resolve(section); 
				}); 
			}).fail(function(){
				deferred.reject(); 
			}); 
			return deferred.promise(); 
		}
		UCIConfig.prototype.$getWriteRequests = function(){
			var self = this; 
			var reqlist = []; 
			self["@all"].map(function(section){
				var changed = section.$getChangedValues(); 
				console.log(JSON.stringify(changed) +": "+Object.keys(changed).length); 
				if(Object.keys(changed).length){
					reqlist.push({
						"config": self[".name"], 
						"section": section[".name"], 
						"values": changed
					}); 
				}
			}); 
			return reqlist; 
		}
		UCI.Config = UCIConfig; 
	})(); 
	
	UCI.prototype.sync = function(configs){
		var deferred = $.Deferred(); 
		var self = this; 
		async.series([
			function(next){
				$rpc.uci.configs().done(function(response){
					var cfigs = response.configs; 
					if(!cfigs) { next("could not retreive list of configs!"); return; }
					cfigs.map(function(k){
						if(!(k in self)){
							self[k] = new UCI.Config(self, k); 
						}
					}); 
					next(); 
				}); 
			}, 
			function(next){
				if(!(configs instanceof Array)) configs = [configs]; 
				if(!configs || configs.length == 0) { next(); return; }; 
				async.eachSeries(configs, function(cf, next){
					if(!(cf in self)) { next("invalid config name "+cf); return; }; 
					self[cf].$sync().done(function(){
						next(); 
					}).fail(function(){
						next("Could not sync config "+cf); 
					}); 
				}, function(err){
					next(err); 
				}); 
			}
		], function(err){
			if(err) deferred.reject(err); 
			else deferred.resolve(); 
		}); 
		return deferred.promise(); 
	}
	
	UCI.prototype.save = function(){
		var deferred = $.Deferred(); 
		var self = this; 
		var writes = []; 
		Object.keys(self).map(function(k){
			if(self[k].constructor == UCI.Config){
				var reqlist = self[k].$getWriteRequests(); 
				reqlist.map(function(x){ writes.push(x); }); 
			}
		}); 
		console.log("Will do following write requests: "+JSON.stringify(writes)); 
		var resync = []; 
		async.eachSeries(writes, function(cmd, next){
			$rpc.uci.set(cmd).done(function(){
				console.log("Wrote config "+cmd.config); 
				resync.push(cmd.config); 
				next(); 
			}).fail(function(){
				console.error("Failed to write config "+cmd.config); 
				next(); 
			}); 
		}, function(){
			async.eachSeries(resync, function(config, next){
				console.log("Committing config "+config); 
				$rpc.uci.commit({config: config}).done(function(){
					console.log("Resynching config "+config); 
					self.sync(config).done(function(){
						next(); 
					}).fail(function(err){
						console.log("error synching config "+config+": "+err); 
						next("syncerror"); 
					}); 
				}).fail(function(err){
					next("could not commit config: "+err); 
				}); 
			}, function(err){
				if(err) deferred.reject(err); 
				else deferred.resolve(err); 
			}); 
		}); 
		return deferred.promise(); 
	}
	return new UCI(); 
}); 
