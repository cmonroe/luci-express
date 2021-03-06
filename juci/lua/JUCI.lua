local table = require("table"); 
local string = require("string"); 
local io = require("io"); 
require("JSON"); 

local base = _G

module("juci"); 

function readfile(name)
	local f = base.assert(io.open(name, "r")); 
	local s = f:read("*a"); 
	s = s:gsub("\n+$", "");  -- remove trailing new line
	f:close(); 
	return s; 
end

function log(source, msg)
	local fd = io.open("/dev/console", "w"); 
	fd:write((source or "juci")..": "..(msg or "").."\n"); 
	fd:close();
end

function shell(fmt, ...)
	for k,v in base.ipairs(arg) do
		-- TODO: this is inherently dangerous way to do shell commands. 
		-- This way gets rid of basic forms of injection attacks, but
		-- it still may miss some others that I did not think about. 
		if base.type(v) == "string" then 
			arg[k] = v:gsub("[;*|]", "\\%1");
		end
	end
	local p = base.assert(io.popen(string.format(fmt, base.unpack(arg)))); 
	local s = p:read("*a"); 
	p:close(); 
	return s; 
end

function ubus(_calls, arg) 
	local call_list = ""; 
	for k,v in base.pairs(_calls) do 
		if call_list ~= "" then call_list = call_list..","; end
		call_list = call_list..k; 
	end
	if arg[1] == ".methods" then 
		base.print(call_list); 
	elseif _calls[arg[1]] then 
		local params = {}; 
		if arg[2] then params = base.json.decode(arg[2]); end
		_calls[arg[1]](params); 
	else 
		io.write("Unknown method!\n"); 
	end
end

return {
	readfile = readfile, 
	log = log, 
	shell = shell, 
	ubus = ubus
}; 

