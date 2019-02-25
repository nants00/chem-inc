/*
Chem Inc. Version 0.1
	a game by nants00
*/

var funds = 0;
var funds_rate = 0;

var research_points = 0;
var scientists = 0;
var scientists_multiplier = 1;

var lead_amount = 0;
var lead_multiplier = 1;
var copper_amount = 0;
var copper_multiplier = 1;
var antimony_amount = 0;
var antimony_multiplier = 1;
var tin_amount = 0;
var tin_multiplier = 1;
var mercury_amount = 0;
var mercury_multiplier = 1;
var sulfur_amount = 0;
var sulfur_multiplier = 1;
var bismuth_amount = 0;
var bismuth_multiplier = 1;
var phosphorus_amount = 0;
var phosphorus_multiplier = 1;
var silver_amount = 0;
var silver_multiplier = 1;
var gold_amount = 0;
var gold_multiplier = 1;

window.setInterval(function(){
	funds_rate = lead_amount*lead_multiplier*0.01 + copper_amount*copper_multiplier*0.02 + antimony_amount*antimony_multiplier*0.03
	+ tin_amount*tin_multiplier*0.04 + mercury_amount*mercury_multiplier*0.05 + sulfur_amount*sulfur_multiplier*0.08
	+ bismuth_amount*bismuth_multiplier*0.16 + phosphorus_amount*phosphorus_multiplier*0.25 + silver_amount*silver_multiplier*0.32
	+ gold_amount*gold_multiplier*0.64;
	funds += funds_rate;
	research_points += scientists*scientists_multiplier*1;
	update_funds();
	update_research();
}, 1000);

function update_funds() {
	document.getElementById("funds").innerHTML = "Funds: $" + Math.round(funds * 100) / 100;
	document.getElementById("funds_rate").innerHTML = "(+$" + Math.round(funds_rate * 100) / 100 + "/s)";
}

function update_research() {
	document.getElementById("research-points").innerHTML = research_points;
}

function cheat() {
	funds += 1000000;
	update_funds();
	research_points += 1000000;
	update_research();
	document.getElementById("title").innerHTML = "Chem Inc(remental) Cheater";
}

function buy_scientist() {
	price = Math.floor(Math.pow(2,scientists));
	if (funds >= price) {
		funds -= price;
		update_funds();
		scientists++;
		document.getElementById("scientists").innerHTML = scientists;
		document.getElementById("buy-scientist").innerHTML = "Buy Scientist: $" + Math.floor(Math.pow(2,scientists));
	}
}

function buy_new_element(element,price) {
	if (research_points >= price) {
		research_points -= price;
		update_research();
		// Set Background
		document.getElementById(element).style.backgroundColor = '#708D81';
		document.getElementById(element).style.cursor = 'pointer';
		// Turn on Top Row
		document.getElementById(element).children[0].style.display = 'flex';
		// Turn on Bottom Row
		document.getElementById(element).children[2].style.display = 'flex';
		// Turn off Upgrade
		document.getElementById('research-'+element).style.display = 'none';
	}
}

function buy_upgrade_pack(pack_name,price) {
	if (research_points >= price) {
		research_points -= price;
		update_research();
		document.getElementById(pack_name).style.display = 'none';
		if (pack_name == 'basic-uses-research'){
			document.getElementById('basic-smithing').style.display = 'block';
			document.getElementById('basic-medicine').style.display = 'block';
			document.getElementById('currency').style.display = 'block';
		}
	}
}

function buy_upgrade(upgrade_name,price) {
	if (funds >= price) {
		funds -= price;
		document.getElementById(upgrade_name).style.display = 'none';
		if (upgrade_name == 'basic-smithing') {
			lead_multiplier *= 2;
			copper_multiplier *= 2;
			document.getElementById('lead-production').innerHTML = Math.floor((lead_amount)*lead_multiplier) / 100;
			document.getElementById('copper-production').innerHTML = Math.floor((copper_amount)*copper_multiplier*2) / 100;
		}
		if (upgrade_name == 'basic-medicine') {
			sulfur_multiplier *= 2;
			antimony_multiplier *= 2;
			document.getElementById('sulfur-production').innerHTML = Math.floor((sulfur_amount)*sulfur_multiplier*8) / 100;
			document.getElementById('antimony-production').innerHTML = Math.floor((antimony_amount)*antimony_multiplier*3) / 100;
		}
		if (upgrade_name == 'currency') {
			silver_multiplier *= 2;
			gold_multiplier *= 2;
			document.getElementById('silver-production').innerHTML = Math.floor((silver_amount)*silver_multiplier*32) / 100;
			document.getElementById('gold-production').innerHTML = Math.floor((gold_amount)*gold_multiplier*64) / 100;
		}
		update_funds();
	}
}

function buy_element(element) {
	var price;
	var element_amount;
	var element_name;
	var next_price;
	var new_production;
	
	// Set Price
	if (element == 'lead') {
		price = ((Math.floor(10 * Math.pow(1.5,lead_amount)) - 10) / 100);
		if (lead_amount == 0) {
			price = 0;
		}
		next_price = ((Math.floor(10 * Math.pow(1.5,lead_amount+1)) - 10) / 100);
		new_production = Math.floor((lead_amount+1)*lead_multiplier) / 100;
	}
	if (element == 'copper') {
		price = Math.floor(1 * Math.pow(1.5,copper_amount));
		next_price = Math.floor(10 * Math.pow(1.5,copper_amount+1))/10;
		new_production = Math.floor((copper_amount+1)*copper_multiplier*2) / 100;
	}
	if (element == 'antimony') {
		price = Math.floor(2 * Math.pow(1.5,antimony_amount));
		next_price = Math.floor(2 * Math.pow(1.5,antimony_amount+1));
		new_production = Math.floor((antimony_amount+1)*antimony_multiplier*3) / 100;
	}
	if (element == 'tin') {
		price = Math.floor(5 * Math.pow(1.5,tin_amount));
		next_price = Math.floor(5 * Math.pow(1.5,tin_amount+1));
		new_production = Math.floor((tin_amount+1)*tin_multiplier*4) / 100;
	}
	if (element == 'mercury') {
		price = Math.floor(10 * Math.pow(1.5,mercury_amount));
		next_price = Math.floor(10 * Math.pow(1.5,mercury_amount+1));
		new_production = Math.floor((mercury_amount+1)*mercury_multiplier*5) / 100;
	}
	if (element == 'sulfur') {
		price = Math.floor(25 * Math.pow(1.5,sulfur_amount));
		next_price = Math.floor(25 * Math.pow(1.5,sulfur_amount+1));
		new_production = Math.floor((sulfur_amount+1)*sulfur_multiplier*8) / 100;
	}
	if (element == 'bismuth' && getComputedStyle(document.getElementById('bismuth').children[0]).getPropertyValue("display") == 'flex') {
		price = Math.floor(50 * Math.pow(1.5,bismuth_amount));
		next_price = Math.floor(50 * Math.pow(1.5,bismuth_amount+1));
		new_production = Math.floor((bismuth_amount+1)*bismuth_multiplier*16) / 100;
	}
	if (element == 'phosphorus' && getComputedStyle(document.getElementById('phosphorus').children[0]).getPropertyValue("display") == 'flex') {
		price = Math.floor(75 * Math.pow(1.5,phosphorus_amount));
		next_price = Math.floor(75 * Math.pow(1.5,phosphorus_amount+1));
		new_production = Math.floor((phosphorus_amount+1)*phosphorus_multiplier*25) / 100;
	}
	if (element == 'silver' && getComputedStyle(document.getElementById('silver').children[0]).getPropertyValue("display") == 'flex') {
		price = Math.floor(100 * Math.pow(1.5,silver_amount));
		next_price = Math.floor(100 * Math.pow(1.5,silver_amount+1));
		new_production = Math.floor((silver_amount+1)*silver_multiplier*32) / 100;
	}
	if (element == 'gold' && getComputedStyle(document.getElementById('gold').children[0]).getPropertyValue("display") == 'flex') {
		price = Math.floor(250 * Math.pow(1.5,gold_amount));
		next_price = Math.floor(250 * Math.pow(1.5,gold_amount+1));
		new_production = Math.floor((gold_amount+1)*gold_multiplier*64) / 100;
	}
	// Buy Item
	if (funds >= price) {
		funds -= price;
		// Increment Amount
		window[element+'_amount']++;
		update_funds();
		// Amount
		document.getElementById(element).children[0].children[0].innerHTML = window[element+'_amount'];
		// Production
		document.getElementById(element).children[0].children[1].innerHTML = new_production;
		// Price
		document.getElementById(element).children[2].children[0].innerHTML = next_price;
	}
}

function nav(location) {
	if (location == 1) {
		document.getElementById("periodic-table").style.display = 'block';
		document.getElementById("upgrades").style.display = 'none';
		document.getElementById("research").style.display = 'none';
		document.getElementById("info").style.display = 'none';
		document.getElementById("playtesting").style.display = 'none';
	}
	if (location == 2) {
		document.getElementById("periodic-table").style.display = 'none';
		document.getElementById("upgrades").style.display = 'flex';
		document.getElementById("research").style.display = 'none';
		document.getElementById("info").style.display = 'none';
		document.getElementById("playtesting").style.display = 'none';
	}
	if (location == 3) {
		document.getElementById("periodic-table").style.display = 'none';
		document.getElementById("upgrades").style.display = 'none';
		document.getElementById("research").style.display = 'block';
		document.getElementById("info").style.display = 'none';
		document.getElementById("playtesting").style.display = 'none';
	}
	if (location == 3) {
		document.getElementById("periodic-table").style.display = 'none';
		document.getElementById("upgrades").style.display = 'none';
		document.getElementById("research").style.display = 'flex';
		document.getElementById("info").style.display = 'none';
		document.getElementById("playtesting").style.display = 'none';
	}
	if (location == 4) {
		document.getElementById("periodic-table").style.display = 'none';
		document.getElementById("upgrades").style.display = 'none';
		document.getElementById("research").style.display = 'none';
		document.getElementById("info").style.display = 'flex';
		document.getElementById("playtesting").style.display = 'none';
	}
	if (location == 5) {
		document.getElementById("periodic-table").style.display = 'none';
		document.getElementById("upgrades").style.display = 'none';
		document.getElementById("research").style.display = 'none';
		document.getElementById("info").style.display = 'none';
		document.getElementById("playtesting").style.display = 'block';
	}
}