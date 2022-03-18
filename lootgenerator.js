Hooks.on("chatMessage", (html, content, msg) => {
  let regExp;
  regExp = /(\S+)/g;
  let commands = content.match(regExp);
  let command = commands[0];
//-1 Random 1 Jewels 2 Clothes 3 Books 4 Coins 5 Misc 6 Weapons 7 Armour
  if (game.user.can('ITEM_CREATE')) {
  if(command === "/treasuregen") {
    if(commands.length === 1) {
    	let message;
      msg.content = "<p>What kind of trasure do you want to generate?</p>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=-1><b>&gt; Any</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=7><b>&gt; Armour</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=4><b>&gt; Cash Container</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=2><b>&gt; Clothes</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=3><b>&gt; Documents and books</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=1><b>&gt; Jewelry</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=5><b>&gt; Misc</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=6><b>&gt; Weapon</b></a></div>";
	    if(msg) {
	      ChatMessage.create(msg);
	    }
		}
		else {
			switch(commands[1]) {
				case 'any': commands[1]=-1;break;
				case 'jewel':
				case 'jewelry': commands[1]=1;break;
				case 'clothes': commands[1]=2;break;
				case 'doc':
				case 'docs':
				case 'book':
				case 'books': commands[1]=3;break;
				case 'coin': 
				case 'coins':
				case 'cash': commands[1]=4;break;
				case 'misc': commands[1]=5;break;
				case 'weapons':
				case 'weapon': commands[1]=6;break;
				case 'armor':
				case 'armora':
				case 'armour':
				case 'armours': commands[1]=7;break;
				default: commands[1]=-1;
			}
			wfrp4LootGenerator(commands[1]);
		}
		return false;
  }
  } else {
		notifications().info("No permisions to create items")
  }
});

Hooks.on('renderChatLog', (log, html, data) => {
  html.on("click", '.trasuregenerator-type', event => {
    event.preventDefault();
	//console.log(event.currentTarget);
    wfrp4LootGenerator($(event.currentTarget).attr("data-treasure-type"));
  });
});

function addItemActionButton(html, label, onClick) {
    const button = document.createElement('button');
    button.style.width = '95%';
    button.innerHTML = label;
    button.addEventListener('click', () => {
        onClick();
    });
    html.find('.header-actions').after(button);
}

Hooks.on("renderSidebarTab", async (app, html) => {
     if (app.options.id == "items" && game.user.can('ITEM_CREATE') )
    {
		if (game.user.can('ITEM_CREATE')) {
			addItemActionButton(html, 'Generate Random Item', () => {
				wfrp4LootGenerator(-1);
		    });
		}
	}
});

function wfrp4LootGenerator (treasuretype) {

	var Availability = [
		"common",
		"scarce",
		"rare",
		"exotic"
	];

	var Qualities = [
		"Fine",
		"Durable",
		"Practical",
		"Lightweight",
		"Ugly",
		"Shoddy",
		"Unreliable",
		"Bulky"
	];

	var FUR = [
		["white wolf fur", 300],
		["ermine", 250],
		["wolf fur", 100],
		["fox fur", 25],
		["$COLOUR fur", 10],
		["squirel fur", 0],
		["fur", 0],
		["fur", 0],
		["mangy fur", -25]
	];

	var TRIMMING = [
		["ermine", 50],
		["fox fur", 25],
		["squirel fur", 0],
		["$COLOUR fur", 10],
		["fur", 0],
		["mangy fur", -25]
	];

	var FIERCEANIMAL = [
		["gryphon", 50],
		["dragon", 25],
		["lion", 25],
		["eagle", 0],
		["panther", 0],
		["bear", 0],
		["wolf", 0],
		["boar", -10]
	];

	var ANIMAL = [
		["snake", 0],
		["fish", 0],
		["horse", 0],
		["dog", 0],
		["seagull", 0],
		["frog", -10],
		["pig", -25],
		["$FIERCEANIMAL", 0],
		["$FIERCEANIMAL", 0],
		["$FIERCEANIMAL", 0]
	];

	//Based on silver
	var CHAINMETAL = [
		["gold", 1900],
		["silver", 0],
		["brass", -90]
	];

	var RAREMETAL = [
		["meteoric iron", 200],
		["Nuln's steel", 200],
		["ithilmar", 2500],
		["Gromril", 2500]
	];

	var METALTRIMS = [
		["gold", 600],
		["gold", 600],
		["silver", 100],
		["silver", 100],
		["tarnished silver", 50],
		["brass", 0],
		["pitted metal", -25],
		["$RAREMETAL", 0]
	];

	var METALFITTING = [
		["gilded", 10],
		["gilded", 10],
		["brass", 0],
		["brass", 0],
		["steel", 0],
		["steel", 0],
		["$METALTRIMS", 0]
	];

	var METALMATERIAL = [
		["$METALTRIMS", 25],
		["$METALTRIMS", 25],
		["$METALTRIMS", 25],
		["Nuln steel", 200],
		["steel", 50],
		["iron", 0],
		["iron", 0],
		["pewter", 0],
		["rusted iron", -25]
	];

	var WOODMATERIAL = [
		["oak wood", 25],
		["ashwood", 25],
		["wood", 0],
		["wood", 0]
	];

	var STONEMATERIAL = [
		["obsidian", 200],
		["marble", 100],
		["$COLOUR stone", 0],
		["stone", 0],
		["clay", -25]
	];

	var ANYMATERIAL = [
		["$METALMATERIAL", 0],
		["$STONEMATERIAL", -50],
		["$WOODMATERIAL", -75]
	];


	var SCABBARDMAT = [
		["$WOODMATERIAL", 0],
		["leather", 0],
		["laced", 0],
		["polished leather", 0],
		["oiled leather", 0],
		["$COLOUR painted wood", 0]
	];

	var CRAFTFINE = [
		["<i>fine</i>", 100],
		["", 0],
		["", 0],
		["", 0]
	];

	var INLAYGEMS = [
		["pearl", 200],
		["sapphire", 200],
		["garnet", 300],
		["emeral", 300],
		["diamond", 500],
		["$MAYBECOLOUR coloured glass", -25]
	];

	var DEITY = [
		["Sigmar", 50],
		["Ulric", 25],
		["Shaylla", 0],
		["Morr", 0],
		["Manaan", 0],
		["Taal", 0],
		["Rhya", 0],
		["Ranald", 0]
	];

	var MAYBECOLOUR = [
		["$COLOUR", 0],
		["", 0]
	];


	var MAYBESIZE = [
		["big", 5],
		["large", 5],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["small", -5],
		["thin", -5]
	];


	var COLOUR = [
		["purple", 50],
		["red", 25],
		["blue", 25],
		["white", 25],
		["dark gray", 0],
		["yellow", 0],
		["tan", 0],
		["green", 0],
		["brown", 0],
		["brownish", -25],
		["greenish", -25]
	];

	var SAINTTITLE = [
		["the Bishop", 0],
		["of $CITY", 0],
		["of $CITY", 0],
		["of $PROVINCE", 0],
		["of $PLACE", 0],
		[" II", 0],
		[" III", 0],
		[" IV", 0],
		[" IX", 0],
		[" the Martyr", 0],
		[" the Elder", 0],
		[" the Young", 0],
		[" the Good", 0]
	];

	var SAINT = [
		["Saint Arnold $SAINTTITLE", 0],
		["Saint Angus $SAINTTITLE", 0],
		["Saint Bertrand $SAINTTITLE", 0],
		["Saint Cyril $SAINTTITLE", 0],
		["Saint Fridolin $SAINTTITLE", 0],
		["Saint Gertrude $SAINTTITLE", 0],
		["Saint Heribert $SAINTTITLE", 0],
		["Saint Hildegard $SAINTTITLE", 0],
		["Saint Odile $SAINTTITLE", 0],
		["Saint Willehad $SAINTTITLE", 0]
	];

	var RELIC = [
		["the ashes of $SAINT", 0],
		["the ashes of $SAINT", 0],
		["a bone of $SAINT", 0],
		["a bone of $SAINT", 0],
		["the $BODYPART of $SAINT", 0],
		["a mummified finger of $SAINT", 10],
		["a mummified hand of $SAINT", 10],
		["the skull of $SAINT", 25],
		["the skull of $SAINT inscribed with '$SHIELDSENTENCE'", 25]
	];

	var SHIELDCOLOURS = [
		["gules (red)", 0],
		["gules (red)", 0],
		["azure (blue)", 0],
		["azure (blue)", 0],
		["vert (green)", 0],
		["vert (green)", 0],
		["sable (black)", 0],
		["sable (black)", 0],
		["purpure (purple)", 0],
		["purpure (purple)", 0],
		["argent (white)", 0],
		["argent (white)", 0],
		["or (yellow)", 0],
		["or (yellow)", 0],
		["sanguine (crimsom)", 0],
		["tenny (orange)", 0],
		["braun (brown)", 0],
		["carnation (pink)", 0],
		["eisen-farbe (iron gray)", 0]
	];

	var SHIELDDECORATIONS = [
		["$SHIELDCOLOURS", 0],
		["$SHIELDCOLOURS", 0],
		["per pale $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["per pale $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["per pale $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["quarterly $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["quarterly $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["per fess $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["per bend $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["per chevron inverted $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["per chevron $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["per saltire $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["two bend $SHIELDCOLOURS and $SHIELDCOLOURS", 0],
		["$SHIELDCOLOURS a cross $SHIELDCOLOURS", 0],
		["$SHIELDCOLOURS a base $SHIELDCOLOURS", 0],
		["$SHIELDCOLOURS a chief $SHIELDCOLOURS", 0],
		["$SHIELDCOLOURS and $SHIELDCOLOURS bordure", 0]
	];

	var SHIELDCHARGES = [
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["with a $SHIELDCOLOURS $FIERCEANIMAL charge ", 0],
		["with a $FIERCEANIMAL proper charge ", 0],
		["with a $SHIELDCOLOURS hammer charge ", 0],
		["with a $SHIELDCOLOURS twin-tailed comet charge ", 0],
		["with a $SHIELDCOLOURS heart charge ", 0],
		["with a $SHIELDCOLOURS $ANIMAL charge ", 0],
		["with a $SHIELDCOLOURS $SHAPE charge ", 0],
		["with a $SHIELDCOLOURS $SHAPE charge ", 0],
		["with a proper $ANIMAL charge ", 0],
		["with a $SHIELDCOLOURS hourglass charge ", 0],
		["with a $SHIELDCOLOURS gothic cross charge ", 0],
		["with a $SHIELDCOLOURS crowned skull charge ", 0],
		["with a proper crowned skull charge ", 0],
		["with a $SHIELDCOLOURS skull charge ", 0],
		["with a $SHIELDCOLOURS set of scales charge ", 0],
		["with a $SHIELDCOLOURS key charge ", 0],
		["with a $SHIELDCOLOURS fleur-de-lys charge ", 0]
	];

	var SHIELDEXTRAS = [
		["", 0],
		["", 0],
		["", 0],
		[" and a scroll that says '$SAINT'", 0],
		[" and a scroll that says '$SHIELDSENTENCE'", 0],
		[" and a scroll that says '$SHIELDSENTENCE'", 0],
		[" and a scroll that says '$SHIELDSENTENCE und $SHIELDSENTENCE'", 0],
		[" and a $DANGLING tied to it", 0]
	];

	var BODYPART = [
		["blood", 0],
		["blood", 0],
		["tears", 0],
		["heart", 0],
		["hand", 0]
	];

	var SHIELDSENTENCE = [
		["$CITY", 0],
		["$CITY", 0],
		["$PROVINCE", 0],
		["$PROVINCE", 0],
		["$DEITY", 0],
		["$DEITY's $BODYPART", 0],
		["Ehre", 0],
		["Sieg", 0],
		["Ewig", 0],
		["Emperor", 0]
	];

	var STAINS = [
		["badly [stained]", -10],
		["mud-caked", -10],
		["blood-speckled", -25],
		["[mouldering]", -25],
		["[filthy], mud-caked, blood-drenched", -50],
		["fire [damaged]", -50]
	];

	var PAPERDAMAGED = [
		["sun-bleached", -10],
		["sun-faded", -10],
		["weathered", -10],
		["well read", -10],
		["worm eaten", -15],
		["water damaged", -15],
		["water-warped", -20],
		["$STAINS", 0],
		["$STAINS", 0],
		["$STAINS", 0],
		["$STAINS", 0],
		["$STAINS", 0]
	];
	var WRITING = [
		["etched", 0],
		["inscribed", 0],
		["engraved", 0]
	];


	var EMBROIDED = [
		["embroided", 25],
		["embroided", 25],
		["embroided", 25],
		["painted", 0]
	];

	var PROVINCE = [
		["Altdorf", 0],
		["Averland", 0],
		["Hotchland", 0],
		["Middenheim", 0],
		["Middenland", 0],
		["Nordland", 0],
		["Nuln", 0],
		["Nuln", 0],
		["Ostermark", 0],
		["Ostland", 0],
		["Reikland", 0],
		["Sylvania", 0],
		["Stirland", 0],
		["Talabecland", 0],
		["Talabheim", 0],
		["Wissenland", 0]
	];

	var CITY = [
		["Altdorf", 0],
		["Nuln", 0],
		["Talabheim", 0],
		["Middenheim", 0],
		["Carroburg", 0],
		["Ubersreik", 0]
	];

	var PLACE = [
		["$PROVINCE", 0],
		["$PROVINCE", 0],
		["$PROVINCE", 0],
		["$CITY", 0],
		["$CITY", 0],
		["Kislev", 0],
		["Wasteland", 0],
		["Estalia", 0],
		["Tilea", 0],
		["Araby", 0]
	];

	var GOODCLOTH = [
		["fashionable", 0],
		["embroidered", 0],
		["richly decorated", 0]
	];


	var BADCLOTH = [
		["badly stiched", 0],
		["full of holes", 0],
		["threadbare", 0],
		["moth-eaten", 0],
		["ragged", 0]
	];

	var GOODORBADCLOTH = [
		["$GOODCLOTH", 20],
		["$BADCLOTH", -20]
	];

	var DECORATION = [
		["of presumably great value", 100],
		["$WRITING with $OATH the Emperor", 50],
		["$WRITING with $OATH $DEITY always", 25],
		["$WRITING with $OATH $DEITY", 25],
		["$WRITING with runes", 25],
		["$WRITING with a vengenful prayer", 10],
		["$WRITING with a prayer to protect the bearer who has faith in $DEITY", 10],
		["$WRITING with the image of crossed swords", 5],
		["$WRITING with a hunting scene", 5],
		["$WRITING with the image of a nude dancer", 5],
		["$WRITING with $SHAPE", 0],
		["$WRITING with $SHAPE", 0],
		["$WRITING with $SHAPE", 0],
		["$WRITING with '$SHIELDSENTENCE'", 0],
		["$WRITING with '$SHIELDSENTENCE und $SHIELDSENTENCE'", 0],
		["with no extra decoration", 0],
		["with no additional decoration", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0]
	];

	var STAFFDECORATION = [
		["$DECORATION", 0],
		["$DECORATION", 0],
		["$DECORATION", 0],
		["$DECORATION", 0],
		["$DECORATION", 0],
		["$DECORATION", 0],
		["$DECORATION", 0],
		["$DECORATION", 0],
		["$DECORATION", 0],
		["$DECORATION", 0],
		["with a corked bottle gourd hanging from the top", 0],
		["with doves decoration, symbol of Shallya", 25],
		["with carved skulls and scythes and the symbol of the Amethyst Order", 25],
		["with a iron open brazier on top and the symbol of the Bright Order", 50],
		["decorated with golden snakes, a candle and the symbol of the Light Order", 50],
		["with designs planets and stars all over it and the symbol of the Celestial Order", 50],
		["gilded, with alchemical signs and the symbol of the Gold Order", 75],
		["of gnarled wood and a symbol of the Jade Order", 15],
		["with a concelead symbol of the Grey Order", 15],
		["with teeth, bones, feathers and skulls dangling from it, on one of them the symbol of the Amber Order", 15]
	];

	var DWARFDECORATION = [
		["of a distinctive geometric design", 25],
		["with geometric engravings", 25],
		["covered with decorative, scrolling engravings", 25],
		["$WRITING with runes", 25],
		["$WRITING with the image of a stylised dwarf's head", 20],
		["$DECORATION", 0],
		["", 0]
	];

	var ELFDECORATION = [
		["leaf-patterned", 25],
		["tree-patterned", 25],
		["decorated with $COLOUR silk ribbons", 25],
		["$WRITING with Eltharin runes", 25],
		["with golden felegree all over it", 25],
		["with a large $INLAYGEMS inset", 25],
		["$DECORATION", 0],
		["", 0]
	];

	var CLOTHDECORATION = [
		["sewn with $COLOUR silk", 50],
		["$EMBROIDED with $OATH the Emperor", 50],
		["$EMBROIDED with $OATH $DEITY always", 25],
		["$EMBROIDED with $OATH $DEITY", 25],
		["$EMBROIDED with runes", 25],
		["stitched with $MINORMOD $COLOUR and $COLOUR $PATTERN", 20],
		["sewn with tiny $ANYMATERIAL beads", 10],
		["$EMBROIDED with the image of a $MAYBECOLOUR nude dancer", 0],
		["$EMBROIDED with small stars all over", 0],
		["$EMBROIDED with $SHAPE", 0],
		["$EMBROIDED with $SHAPE", 0],
		["$EMBROIDED with $SHAPE", 0],
		["$EMBROIDED with the arms of $PROVINCE", 0],
		["$EMBROIDED with the arms of $CITY", 0],
		["", 0],
		["", 0]
	];

	var CLOTHCHARACTER = [
		["with a prayer sewn", 10],
		["with a small bone pinned", 0],
		["with a small patch of $COLOUR cloth", 0],
		["with a $COLOUR ribbon", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0]
	];

	var BUTTONSCHARACTER = [
		["with rought $WOODMATERIAL buttons", 0],
		["with carved $WOODMATERIAL buttons", 5],
		["with carved $WOODMATERIAL buttons shaped like $SHAPE", 5],
		["with smoothly carved whalebone buttons", 10],
		["with roughly etched horn toggles", 5],
		["with brass clasps", 5],
		["with simple brass buttons", 5],
		["with brass buttons shaped like $SHAPE", 5],
		["with pewter buttons", 5],
		["with buttons shaped like skulls", 5],
		["with cross shaped brass buttons", 5],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0]
	];


	var SIZED = [
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		[", sized for an [elf]", 10],
		[", sized for a [dwarf]", 10],
		[", sized for a [halfling]", 10],
		[", sized for a [halfling]", 10],
		[", sized for a large human", 10],
	];

	var OATH = [
		["a sacred oath of obedience to", 0],
		["a sacred oath to", 0],
		["a prayers to", 0],
		["a sacred devotions to", 0]
	];

	var FOLLOWERS = [
		["worshippers", 0],
		["followers", 0],
		["the church", 0],
		["the cult", 0]
	];

	var SHAPE = [
		["the symbol of the four seasons", 20],
		["the symbol of the eight winds of magic", 20],
		["a twin-tailed comet", 20],
		["an hourglass", 20],
		["a gothic cross", 20],
		["a crowned skull", 20],
		["a skull", 20],
		["a set of scales", 20],
		["the twin-tailed comet symbol used by $FOLLOWERS of Sigmar", 20],
		["the twin-tailed comet symbol used by $FOLLOWERS of Sigmar", 20],
		["the hammer symbol used by $FOLLOWERS of Sigmar", 20],
		["the 'U' symbol used by $FOLLOWERS of Ulric", 20],
		["the wolf's head symbol used by $FOLLOWERS of Ulric", 20],
		["a five-pointed crown recogniced as the symbol of Manaan", 15],
		["'X' symbols recognised by $FOLLOWERS of Ranald", 10],
		["a heart", 10],
		["a hammer", 10],
		["a $ANIMAL", 10],
		["a $ANIMAL", 10],
		["a $ANIMAL's head", 10],
		["a $ANIMAL's head", 10],
		["the arms of $PROVINCE", 10],
		["the arms of $CITY", 10],
		["a hand", 10],
		["a grimacing face", 0],
		["coiled serpents", 0],
		["a crescent moon", 0],
		["a bone", 0],
		["a wreath", 0],
		["a leaf", 0]
	];

	var JEWELSTRING = [
		["hemp cord", -25],
		["leather cord", 0],
		["$COLOUR string", 0],
		["$COLOUR silk cord", 100],
		["silver chain", 100],
		["gold chain", 300],
		["fine $METALTRIMS chain", 50]
	];

	var PATTERN = [
		["diamond checks", 0],
		["checks", 0],
		["flames", 0],
		["chevrons", 0],
		["stripes", 0]
	];

	var LANGUAGE = [
		["Reiklander", 0],
		["Bretonnian", 0],
		["Kislevite", 0],
		["Wastelander", 0],
		["Arabian", 10],
		["Albionesse", 10],
		["Khazalid", 10],
		["Eltharin", 10],
		["Nehekharan hieroglyphics", 20],
		["Slann Pictograms", 20]
	];

	var QUALITY = [
		["[delicate]", 30],
		["[big]", 50],
		["[ornate]", 30],
		["", 0],
		["[small]", -30]
	];


	var MINORMOD = [
		["[delicate]", 10],
		["[ornate]", 10],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["[simple]", -10],
		["[plain]", -10],
		["[crude]", -10]
	];

	var SWORD = [
		["sword", 0],
		["sword", 0],
		["broadsword", 0],
		["arming sword", 0],
		["cutlass", 0],
		["katzbalger (<i>sword</i>)", 0],
		["falchion", 0],
		["messer (<i>sword</i>)", 0],
		["dussack (<i>sword</i>)", 0],
		["cinquedea (<i>sword</i>)", 0]
	];

	var DAGGER = [
		["dagger", 0],
		["dagger", 0],
		["leaf-bladed dagger", 0],
		["curved dagger", 0],
		["stiletto", 0],
		["rondel dagger", 0],
		["bollock dagger", 0],
		["poniard (<i>dagger</i>)", 0],
		["anelace (<i>dagger</i>)", 0]
	];

	var HANDWEAPON = [
		["axe", 0],
		["axe", 0],
		["bearded axe", 0],
		["battle axe", 0],
		["battle axe", 0],
		["mace", 0],
		["mace", 0],
		["warhammer (<i>hand weapon</i>)", 0],
		["warhammer (<i>hand weapon</i>)", 0],
		["military hammer (<i>hand weapon</i>)", 0],
		["military pick (<i>hand weapon</i>)", 0],
		["morning star (<i>hand weapon</i>)", 0],
		["reinforced club (<i>hand weapon</i>)", 0]
	];

	var FENCING = [
		["foil", 0],
		["rapier", 0]
	];

	var GOODQUALITY = [
		["<I>fine</I>", 0],
		["<I>durable</I>", 0],
		["<I>practical</I>", 0],
		["<I>lightweight</I>", 0]
	];

	var BADQUALITY = [
		["<I>ugly</I>", 0],
		["<I>shoddy</I>", 0],
		["<I>unreliable</I>", 0],
		["<I>bulky</I>", 0]
	];

	var GOODBLADEDECO = [
		["with a pattern-welded blade", 0],
		["made with good quality [steel]", 0],
		["$DECORATION", 0],
		["$DECORATION", 0]
	];

	var BADBLADEDECO = [
		["saltwater-corroded", 0],
		["dented", 0],
		["pitted", 0],
		["rusted", 0],
		["bent", 0],
		["badly repaired", 0]
	];

	var GOODWEAPONPREFIX = [
		["nicely crafted", 0],
		["well-made", 0],
		["superior", 0],
		["superior", 0],
		["excelent", 0],
		["{elegant}", 0],
		["$NEUTRALWEAPONPREFIX", 0],
		["", 0]
	];

	var GOODWOODENPREFIX = [
		["{reinforced}", 0],
		["{robust}", 0],
		["{iron-shod}", 0],
		["$NEUTRALWEAPONPREFIX", 0],
		["", 0]
	];

	var BADWOODENPREFIX = [
		["splintered", 0],
		["rotten", 0],
		["craked", 0],
		["warped", 0],
		["$NEUTRALWEAPONPREFIX", 0],
		["", 0]
	];

	var NEUTRALWEAPONPREFIX = [
		["well-used", 0],
		["battle-proven", 0],
		["slighly [scratched]", 0],
		["old-fashioned", 0],
		["", 0],
		["", 0],
		["", 0]
	];

	var DANGLING = [
		["a $COLOUR ribbon", 0],
		["some $COLOUR ribbons", 0],
		["a string of oyster shells", 0],
		["a string of oyster shells", 0],
		["a string of snail shells", 0],
		["a string of small bells", 0],
		["a single small bell", 0],
		["some prayer ribbons to $DEITY", 0],
		["a pewter statuette of $DEITY", 0],
		["a few eagle feathers", 0],
		["an owl feather", 0],
		["a string of wolf's teeth", 0],
		["a few $COLOUR feathers", 0],
		["a tuff of horse hair", 0]
	];

	var POMMELHILTSCABBARD = [
		["a $METALFITTING hilt and pommel", 0],
		["a $METALFITTING hilt and pommel", 0],
		["$DANGLING tied to the pommel", 0],
		["$DANGLING tied to the pommel", 0],
		["a $METALFITTING pommel in the shape of a two-headed $FIERCEANIMAL", 0],
		["a $METALFITTING pommel in the shape of a $SHAPE", 0],
		["a $METALFITTING round pommel with an icon of $DEITY", 0],
		["a $METALFITTING round pommel", 0],
		["a $METALFITTING disc pommel", 0],
		["a $METALFITTING fishtail pommel", 0],
		["a $METALFITTING scent stopper pommel", 0],
		["a $INLAYGEMS-studded pommel", 0],
		["a $METALFITTING hilt", 0],
		["a $METALFITTING sidering attached to the hilt", 0],
		["a $METALFITTING finger-ring attached to the hilt", 0],
		["a $METALFITTING nagel attached to the hilt", 0],
		["a $METALFITTING knuckle-bow", 0],
		["a $METALFITTING shell guard", 0],
		["a $METALFITTING S-shaped hilt", 0],
		["a $METALFITTING cruciform hilt", 0],
		["a $METALFITTING hilt $DECORATION", 0],
		["a $METALFITTING hilt $DECORATION", 0],
		["a $SCABBARDMAT scabbard $DECORATION", 0],
		["a $SCABBARDMAT scabbard $DECORATION", 0],
		["a $MINORMOD $SCABBARDMAT scabbard $DECORATION", 0],
		["a $SCABBARDMAT scabbard", 0],
		["a $SCABBARDMAT scabbard", 0],
		["a $MINORMOD $SCABBARDMAT scabbard", 0]
	];

	var POMMELHANDLE = [
		["$DANGLING tied to the pommel", 0],
		["$DANGLING tied to the handle", 0],
		["a $METALFITTING pommel in the shape of a two-headed $FIERCEANIMAL", 0],
		["a $METALFITTING pommel in the shape of a $SHAPE", 0],
		["a $METALFITTING round pommel with an icon of $DEITY", 0],
		["a $METALFITTING round pommel", 0],
		["a $METALFITTING disc pommel", 0],
		["a $METALFITTING fishtail pommel", 0],
		["a $METALFITTING scent stopper pommel", 0],
		["a steel-reinforced $WOODMATERIAL handle", 0],
		["a $WOODMATERIAL handle $DECORATION", 0],
		["a $WOODMATERIAL handle $DECORATION", 0],
		["a $MAYBECOLOUR sling-strap", 0],
		["a $MAYBECOLOUR leather sling-strap", 0]
	];

	var WITHPAULDRONSANDTASSETS = [
		["", 0],
		["", 0],
		["", 0],
		["with pauldrons", 0],
		["with pauldrons", 0],
		["with spaulders", 0],
		["with munnions", 0],
		["with ailettes", 0],
		["with solid tassets", 0],
		["with articulated tassets", 0],
		["with pauldrons and tassets", 0],
		["with pauldrons and tassets", 0],
	];

	var MAILDECORATIONS = [
		 ["decorated with bronze rings at the edges",0],
		 ["decorated with golden rings at the edges", 10],
		 ["decorated with $SHAPE of lacquered rings"],
		 ["edged with $COLOUR ribbon",0],
		 ["edged with $COLOUR ribbon",0],
		 ["",0],
		 ["",0],
		 ["",0],
		 ["",0],
		 ["",0]
	];
	 
	var HELMDECORATIONS = [
	  ["with a $COLOUR plume", 5],
	  ["with a gilded nose-guard", 0],
	  ["with a {$FIERCEANIMAL} figure on top",0],
	  ["with laurel wreath",0],
	  ["with pair of bovine horns",0],
	  ["with pair of caprine horns",0],
	  ["with laurel wreath",0],
	  ["with a pair of wings",0],
	  ["with a pair of antlers",0],
	  ["",0],
	  ["",0],
	  ["",0]
	];

	var CARDDECKS = [
		["82-card Reiklander Tarock", 0],
		["82-card Reiklander Tarock", 0],
		["82-card Reiklander Tarock, carefully marked", 0],
		["42-card Wissen Trionki", 0],
		["42-card Wissen Trionki, carefully marked", 0],
		["48-card Estalian deck", 0],
		["Old style Brettonian deck", 0],
		["Kyslev-style Trionki deck", 0],
		["102-card Dwarven runic deck", 10]
	];
	var TRADETOOLS = [
		["a [painter's] kit with " + (roll1d10() + 1) + " paintbrushes, a $METALFITTING flask with turpentine and pots of prepared oil paints, a few sponges and sheets of thick linen canvas. ??", 0],
		["an [apothecary's] trade tools with a set of spoons, weight and scales, " + (roll1d10() + 2) + " glass phials, tins of rare earth and hard-to-find herbs, bottles of essential oils, pestle and mortar", 0],
		["an [herbolist's] trade tools with pestle and mortar, " + (roll1d10() + 1) + " small knives, pruning shears, and a set of $MAYBECOLOUR gloves", 0],
		["a [gunsmith's] trade tool with a hammer, files, a musket-cleaning kit with muzzle rods, oils, chamois, fuses, flints and spare parts", 0],
		["a barber [surgeon's] trade tools including a sutures, saw, serrated knife, tooth pliers, a bottle of rotgut, spiked tongs and branding irons. There is also a jar with " + (roll1d10() + 1) + " tooth already extracted", 0],
		["a [physician's] trade tools including needles and sutures, bandages, scalpel, vinegar, a serrated knife, forceps, and a speculum", 0],
		["a [tailor's] kit with pins and needles, swatches of fabric, scissors, measuring ribbon, " + (roll2d10() + 8) + " assorted buttons and spools of coloured thread", 0],
		["a [engineer's] set of trade tools with papers, " + (roll1d10() + 1) + " chalks and charcoal sticks, hourglass, measuring rod, fuse cord, drafting compass, and T-square", 0],
		["a [navigator's] kit composed of quadrant, astrolabe, charts and compasses, hourglass, and " + (roll1d10() + 4) + " yards sounding line", 0],
		["a [smith's] trade tools with a big hammer, a smaller one, tongs, punches, swages, bits, and augers", 0],
		["a [carpenter's] trade tools with hammer and " + (roll2d10() + 16) + " assorted nails, saw, auger and bits, measuring rod, chalk, and plumb lines.", 0]
	];

	var MAYBEBULKYDURABLE = [
		[", fitted with a iron [reinforced] bound, making it <I>bulky</I> but <I>durable</I>", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0]
	];

	var BOOKDECORATION = [
		[", within it are a few pressed flowers", 0],
		[" with a few $COLOUR ribbons to bookmark it", 0],
		[" with a few $COLOUR ribbons to bookmark it", 0],
		[" with strange illuminations in the margins", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
	];
	var BOOKMAYBETHE = [
		["The", 0],
		["The", 0],
		["The", 0],
		["The", 0],
		["Multiple", 0],
		["Book of the ", 0],
		["On the", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0]
	];

	var BOOKADJETIVE = [
		["Abridged ", 0],
		["Accumulated ", 0],
		["Assembled ", 0],
		["Collected ", 0],
		["Complete ", 0],
		["Comprehensive ", 0],
		["Critical ", 0],
		["Distinctive ", 0],
		["Elaborated ", 0],
		["Essential ", 0],
		["Experiential ", 0],
		["Exposed ", 0],
		["Final ", 0],
		["Finest ", 0],
		["First ", 0],
		["Fundamental ", 0],
		["Glorious ", 0],
		["Great ", 0],
		["Indispensible ", 0],
		["Major ", 0],
		["New ", 0],
		["Original ", 0],
		["Principal ", 0],
		["Universal ", 0],
		["Valuable ", 0],
		["", 0]
	];

	var BOOKMAIN = [
		["Accounts on ", 0],
		["Arguments on ", 0],
		["Conceptions on ", 0],
		["Considerations on ", 0],
		["Discourse on ", 0],
		["Dissertation on ", 0],
		["Encyclopedia on ", 0],
		["Essays on ", 0],
		["Examinations on ", 0],
		["Exposé on ", 0],
		["Findings on ", 0],
		["Handbook on ", 0],
		["Hypothesis on ", 0],
		["Insights into ", 0],
		["Knowledge on ", 0],
		["Lectures on ", 0],
		["Lessons on ", 0],
		["Notes on ", 0],
		["Observations on ", 0],
		["Records on ", 0],
		["Research on ", 0],
		["Studies on ", 0],
		["Teachings on ", 0],
		["Theories on ", 0],
		["Writings on ", 0]
	];

	var BOOKAPOTHECARY = [
		["the Alcohol in Healing Remedies", 0],
		["the Arsenic Cookbook", 0],
		["the Apothecary Spirits & Oils", 0],
		["the Application of Healing Poultices", 0],
		["the Botany & Pharmacopeia", 0],
		["the Curing Potions and Draughts", 0],
		["the Draughts and Ointments", 0],
		["the Drugs made from Minerals", 0],
		["the Exotic Ointments of New World", 0],
		["the Healing Herbs of Bretonnia", 0],
		["the Herb Graden Maintenance", 0],
		["the Incredible Potions of Empire", 0],
		["the Liquors for Headaches", 0],
		["the Kislevan Herbs", 0],
		["the Nature of Bodily Fluids", 0],
		["the Mushroms & their Effects", 0],
		["the Mandrake Potions", 0],
		["the Ointments for Wounds", 0],
		["the Poisons of Tilea & Araby", 0],
		["the Preparation of Tonics", 0],
		["the Real Dangers of Plants", 0],
		["the Sickness' Remedies & Cures", 0],
		["the Treatment of Burn Injuries", 0],
		["the Unnatural Selection in Plants", 0],
		["the Weirdroot Recepies", 0]
	];

	var BOOKENGINEERING = [
		["the Artillery & Measures", 0],
		["the Ancient Mechanical Wonders", 0],
		["the Clockwork Mechanism", 0],
		["the Computational Tools", 0],
		["the Dwarven Contraptions", 0],
		["the Dynamics & Motion", 0],
		["the Explosives and Eruptions", 0],
		["the Fluid Mechanics in Steam Engines", 0],
		["the Gunpowder & Firearms", 0],
		["the Heating Principles", 0],
		["the Ingenious Devices of Elves", 0],
		["the Kislevan Gemcutting Tools", 0],
		["the Locking Design Schematics", 0],
		["the Major Flaws & Errors", 0],
		["the Mechanics of Motion and Flight", 0],
		["the Military Constructions & Forts", 0],
		["the Nature of Force and Impact", 0],
		["the New Technical Inventions", 0],
		["the Old World's War Devices", 0],
		["the Pumping Mechanism", 0],
		["the Siege Engines of Nuln", 0],
		["the Standard Procedures in Architecture", 0],
		["the Structure of Iron and Gromril", 0],
		["the Techniks of Engines", 0],
		["the Weird Gunpowder Uses", 0]
	];

	var BOOKLAW = [
		["the Agrarian Reforms", 0],
		["the Areas of Political Influence", 0],
		["the Authority (vol. III)", 0],
		["the Construction Permits", 0],
		["the Corporal Punishment", 0],
		["the Diplomatic Protocols", 0],
		["the Elves & Merchant Amenities", 0],
		["the Financial & Tax Rules", 0],
		["the Guild Courts Procedures", 0],
		["the Inheritance & Succession Law", 0],
		["the Imperial Electoral System", 0],
		["the Imperial Trade Quotas", 0],
		["the Justice of Men & Elves", 0],
		["the Lawyers' Regulations", 0],
		["the Legal History of the Empire", 0],
		["the Liberty and Order", 0],
		["the Maritime & River Law", 0],
		["the Middenland's Hunting Rights", 0],
		["the Origins of Rebellion", 0],
		["the Peasant's Cattle Mores", 0],
		["the Provincial Treaties", 0],
		["the Property Rights", 0],
		["the Republican Idea", 0],
		["the Sigmarite Jurisprudence", 0],
		["the Witchcraft Trials", 0]
	];

	var MAYBEOFGOD = [
		[" of $DEITY and $DEITY", 0],
		[" of $DEITY", 0],
		[" of $DEITY", 0],
		[" of $DEITY", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0]
	];

	var BOOKRELIGION = [
		["the Grand Theogonists lives", 0],
		["the Death, Morr and other Gods", 0],
		["the Divinity $MAYBEOFGOD", 0],
		["the Orthodox Imperatives $MAYBEOFGOD", 0],
		["the Cathegorical Miracles $MAYBEOFGOD", 0],
		["the Pious Salvation $MAYBEOFGOD", 0],
		["the True Teachings $MAYBEOFGOD", 0],
		["the Supreme Preaching $MAYBEOFGOD", 0],
		["the Holy Sermons $MAYBEOFGOD", 0],
		["the Holy Prophecies $MAYBEOFGOD", 0],
		["the Sacred Visions $MAYBEOFGOD", 0],
		["the Portents and Misteries $MAYBEOFGOD", 0],
		["the Saints, Martirs and Clergy $MAYBEOFGOD", 0],
		["the Most Virtous Truths $MAYBEOFGOD", 0]
	];

	var BOOKMEDICINE = [
		["the Amputation Techniques", 0],
		["the Botanical Remedies", 0],
		["the Bodily Chemistry", 0],
		["the Bestial Psyche", 0],
		["the Cranial Structure and Pain", 0],
		["the Exotic Ointments of Norsca", 0],
		["the False Ailment Symptoms", 0],
		["the Gory Operations", 0],
		["the Human & Elven Anatomy", 0],
		["the Healing Process", 0],
		["the Knowledge of Death", 0],
		["the Largest Tumors", 0],
		["the Living Tissue & Force", 0],
		["the Military Field Medicine", 0],
		["the Magical Wounds", 0],
		["the Nature of Plague", 0],
		["the Nefarious Sicknesses of Border Princes", 0],
		["the Origins of Diseases", 0],
		["the Pox and its Prevention", 0],
		["the Poisons and Cures", 0],
		["the Rotten Flesh & Pus", 0],
		["the Secrets of Longivity", 0],
		["the Treatment of Burn Injuries", 0],
		["the Uses of Leeches in Treament of Sickness", 0],
		["the Wounds, Injuries & Harm ", 0]
	];

	var BOOKSCIENCE = [
		["the Astronomical Distances", 0],
		["the Botany & Plant Growth", 0],
		["the Basic Chemistry", 0],
		["the Bestial Psyche", 0],
		["the Celestial Bodies", 0],
		["the Exotic Animals of the New World", 0],
		["the Four Elements & some more", 0],
		["the Gunpowder Experiments", 0],
		["the Human & Elven Anatomy", 0],
		["the Illusions and Shadows", 0],
		["the Knowledge of Nature", 0],
		["the Logics of Breeding & Mating", 0],
		["the Lizards and Reptilians", 0],
		["the Mathematical Problems", 0],
		["the Methodical Approach", 0],
		["the Nature of Winged Beasts", 0],
		["the Neverendings of Plagues & Poxes", 0],
		["the Origins of Diseases", 0],
		["the Optics & Light", 0],
		["the Poisons and Cures", 0],
		["the Research Techniques", 0],
		["the Scientific Reasoning", 0],
		["the Truth in the Sciences", 0],
		["the Unnatural Selection", 0],
		["the Zoological Wonders", 0]
	];

	var BOOKHERALDRY = [
		["the Aquilla Sigil in Imperial Edicts & Laws", 0],
		["the Black Guard's Raven Imagery", 0],
		["the Bretonnian Coat of Arms", 0],
		["the Cross & Skull on Pirate Flags", 0],
		["the Colours of Halfling Klans", 0],
		["the Dwarven Runes in Heraldy", 0],
		["the Elven Coat of Arms & their Colours", 0],
		["the Flags of Templar Knight Orders", 0],
		["the Greenskins' Tribal Symbols", 0],
		["the Hochland's Hunting Houses' Colours", 0],
		["the Imperial Heraldic Codes", 0],
		["the Insignia of Imperial Navy", 0],
		["the Knights and their Shield Symbols", 0],
		["the Lines and Stripes in Guild Stamps", 0],
		["the Lost Meaning of Skull Symbolism", 0],
		["the Legendary Beasts on Imperial Sigils", 0],
		["the Nightwatch Uniforms & Badges", 0],
		["the Military Insignia of the Empire", 0],
		["the Orcs in Dwarven Symbolism", 0],
		["the Patterns and Images on Mercenary Flags", 0],
		["the Town Seals of Tilea & Estalia", 0],
		["the Roadwarden's Symbols and Signes", 0],
		["the Shields of Provincial Militias", 0],
		["the Symbolism of Hammer on War Banners", 0],
		["the Witchunters' Insignia", 0]
	];

	var BOOKHISTORY = [
		["the Ancient Priest-Kings of Nehekhara", 0],
		["the Battles of Black Fire Pass", 0],
		["the Construction of Altdorf's Palaces", 0],
		["the Conquest of Kislev & Gospodar's Ruleship", 0],
		["the Chronology of Crusades in Araby", 0],
		["the Destruction of Mordheim", 0],
		["the Elven Heroes in Folk Stories", 0],
		["the Great Witchunters of $PROVINCE", 0],
		["the Guilds of the Empire and Marienburg", 0],
		["the Halfling Question in the Imperial Society", 0],
		["the History of Chaos Incursions", 0],
		["the Independence of Marienburg", 0],
		["the Knights of the White Wolf", 0],
		["the Lords of Dwarven Karaks", 0],
		["the Legends of Sigmar", 0],
		["the Middenheim's History", 0],
		["the Norscan Clans and their Jarls", 0],
		["the Nobile Families of Empire", 0],
		["the Origins of Troll Slayers", 0],
		["the Peasant's Revolts in Bretonnia", 0],
		["the Pre-Sigmarite Tribal Kings", 0],
		["the Rise and Fall of Knightly Orders", 0],
		["the Streissen Massacre", 0],
		["the Victories of Karl-Franz I", 0],
		["the Wizards and College of Magic", 0]
	];

	var BOOKMAGIC = [
		["the Aethyric Attunement Techniques", 0],
		["the Alchemical Processes & Experiments", 0],
		["the Articles of Imperial Magic", 0],
		["the Azyr or the Blue Wind of Heavens", 0],
		["the Aqshy or the Red Wind of Fire", 0],
		["the Black Magisters and their Traitorous Acts", 0],
		["the Chamon – the Yellow Wind of Metal", 0],
		["the Dangers of Dhar or Dark Magic", 0],
		["the Ghur or the Feral Brown Wind", 0],
		["the Ghyran: the Green Wind of Life", 0],
		["the Hedge Wizards and Witches in the Empire", 0],
		["the High Magic of Elven Mages", 0],
		["the Hysh or the White Wind of Brilliance", 0],
		["the Language of Magick and Arcana", 0],
		["the Magical Items and Arcane Treasures", 0],
		["the Magical Sense and Witchsight", 0],
		["the Potion Brewing & Alchemy", 0],
		["the Preservation of Ingredients", 0],
		["the Realms of Sorcery", 0],
		["the Ritual Magic and Spellcraft", 0],
		["the Shyish, the Purple WInd of Mortality", 0],
		["the Uglu: the Grey Wind of Illusion", 0],
		["the Waystones and Leylines", 0],
		["the White Tower of Hoeth", 0],
		["The Wyrdstone's Corruption Effects", 0]
	];



	var MAYBETITLEAPOTHECARY = [
		["It's titled '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKAPOTHECARY' .", 0],
		["Written on the cover, '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKAPOTHECARY'.", 0],
		["", 0]
	];

	var MAYBETITLEMEDICINE = [
		["It's titled '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKMEDICINE' .", 0],
		["Written on the cover, '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKMEDICINE'.", 0],
		["", 0]
	];

	var MAYBETITLESCIENCE = [
		["It's titled '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKSCIENCE'.", 0],
		["Written on the cover, '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKSCIENCE.", 0],
		["", 0]
	];

	var MAYBETITLEENGINEERING = [
		["It's titled '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKENGINEERING' .", 0],
		["Written on the cover, '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKENGINEERING'.", 0],
		["", 0]
	];

	var MAYBETITLEMAGIC = [
		["It's titled '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKMAGIC'.", 0],
		["Written on the cover, '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKMAGIC'.", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0],
		["", 0]
	];

	var MAYBETITLERELIGION = [
		["It's titled simply 'Gods'.", 0],
		["It's titled simply '$DEITY'.", 0],
		["It's titled '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKRELIGION'.", 0],
		["Written on the cover, '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKRELIGION'.", 0],
		["", 0]
	];

	var MAYBETITLELAW = [
		["It's titled simply 'Laws'.", 0],
		["It's titled '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKLAW'.", 0],
		["Written on the cover, '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKLAW'.", 0],
		["", 0]
	];

	var MAYBETITLEHERALDRY = [
		["Its titled '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKHERALDRY'.", 0],
		["Written on the cover, '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKHERALDRY'.", 0],
		["", 0]
	];

	var MAYBETITLEHISTORY = [
		["Its titled '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKHISTORY .", 0],
		["Written on the cover, '$BOOKMAYBETHE $BOOKADJETIVE $BOOKMAIN $BOOKHISTORY'.", 0],
		["", 0]
	];

	var ALLSTRINGS = [
		["$SWORD", SWORD],
		["$DAGGER", DAGGER],
		["$HANDWEAPON", HANDWEAPON],
		["$FENCING", FENCING],
		["$GOODBLADEDECO", GOODBLADEDECO],
		["$BADBLADEDECO", BADBLADEDECO],
		["$GOODWEAPONPREFIX", GOODWEAPONPREFIX],
		["$GOODWOODENPREFIX", GOODWOODENPREFIX],
		["$BADWOODENPREFIX", BADWOODENPREFIX],
		["$NEUTRALWEAPONPREFIX", NEUTRALWEAPONPREFIX],
		["$POMMELHILTSCABBARD", POMMELHILTSCABBARD],
		["$POMMELHANDLE", POMMELHANDLE],
		["$DANGLING", DANGLING],
		["$SIZED", SIZED],
		["$BUTTONSCHARACTER", BUTTONSCHARACTER],
		["$CLOTHDECORATION", CLOTHDECORATION],
		["$CLOTHCHARACTER", CLOTHCHARACTER],
		["$DWARFDECORATION", DWARFDECORATION],
		["$ELFDECORATION", ELFDECORATION],
		["$DECORATION", DECORATION],
		["$STAFFDECORATION", STAFFDECORATION],
		["$SHAPE", SHAPE],
		["$FOLLOWERS", FOLLOWERS],
		["$ANIMAL", ANIMAL],
		["$FIERCEANIMAL", FIERCEANIMAL],
		["$JEWELSTRING", JEWELSTRING],
		["$ANYMATERIAL", ANYMATERIAL],
		["$CHAINMETAL", CHAINMETAL],
		["$METALMATERIAL", METALMATERIAL],
		["$METALFITTING", METALFITTING],
		["$METALTRIMS", METALTRIMS],
		["$RAREMETAL", RAREMETAL],
		["$SCABBARDMAT", SCABBARDMAT],
		["$WOODMATERIAL", WOODMATERIAL],
		["$STONEMATERIAL", STONEMATERIAL],
		["$CRAFTFINE", CRAFTFINE],
		["$INLAYGEMS", INLAYGEMS],
		["$BODYPART", BODYPART],
		["$DEITY", DEITY],
		["$PAPERDAMAGED", PAPERDAMAGED],
		["$STAINS", STAINS],
		["$FUR", FUR],
		["$TRIMMING", TRIMMING],
		["$PATTERN", PATTERN],
		["$OATH", OATH],
		["$GOODORBADCLOTH", GOODORBADCLOTH],
		["$GOODCLOTH", GOODCLOTH],
		["$BADCLOTH", BADCLOTH],
		["$MAYBESIZE", MAYBESIZE],
		["$MAYBECOLOUR", MAYBECOLOUR],
		["$COLOUR", COLOUR],
		["$SHIELDCHARGES", SHIELDCHARGES],
		["$SHIELDDECORATIONS", SHIELDDECORATIONS],
		["$SHIELDEXTRAS", SHIELDEXTRAS],
		["$SHIELDSENTENCE", SHIELDSENTENCE],
		["$SHIELDCOLOURS", SHIELDCOLOURS],
		["$SAINTTITLE", SAINTTITLE],
		["$SAINT", SAINT],
		["$RELIC", RELIC],
		["$BOOKDECORATION", BOOKDECORATION],
		["$BOOKMAYBETHE", BOOKMAYBETHE],
		["$BOOKADJETIVE", BOOKADJETIVE],
		["$BOOKMAIN", BOOKMAIN],
		["$BOOKAPOTHECARY", BOOKAPOTHECARY],
		["$BOOKENGINEERING", BOOKENGINEERING],
		["$BOOKMEDICINE", BOOKMEDICINE],
		["$BOOKLAW", BOOKLAW],
		["$BOOKRELIGION", BOOKRELIGION],
		["$BOOKHISTORY", BOOKHISTORY],
		["$BOOKHERALDRY", BOOKHERALDRY],
		["$BOOKMAGIC", BOOKMAGIC],
		["$BOOKSCIENCE", BOOKSCIENCE],
		["$MAYBEOFGOD", MAYBEOFGOD],
		["$MAYBETITLEAPOTHECARY", MAYBETITLEAPOTHECARY],
		["$MAYBETITLEMEDICINE", MAYBETITLEMEDICINE],
		["$MAYBETITLEENGINEERING", MAYBETITLEENGINEERING],
		["$MAYBETITLELAW", MAYBETITLELAW],
		["$MAYBETITLEHISTORY", MAYBETITLEHISTORY],
		["$MAYBETITLEHERALDRY", MAYBETITLEHERALDRY],
		["$MAYBETITLERELIGION", MAYBETITLERELIGION],
		["$MAYBETITLEMAGIC", MAYBETITLEMAGIC],
		["$MAYBETITLESCIENCE", MAYBETITLESCIENCE],
		["$MAYBEBULKYDURABLE", MAYBEBULKYDURABLE],
		["$PLACE", PLACE],
		["$PROVINCE", PROVINCE],
		["$LANGUAGE", LANGUAGE],
		["$CITY", CITY],
		["$WRITING", WRITING],
		["$EMBROIDED", EMBROIDED],
		["$MINORMOD", MINORMOD],
		["$QUALITY", QUALITY],
		["$WITHPAULDRONSANDTASSETS", WITHPAULDRONSANDTASSETS],
		["$MAILDECORATIONS",MAILDECORATIONS],
		["$HELMDECORATIONS", HELMDECORATIONS],
		["$CARDDECKS", CARDDECKS],
		["$TRADETOOLS", TRADETOOLS],
		["$GOODQUALITY", GOODQUALITY],
		["$BADQUALITY", BADQUALITY]
	];

	//Treasure, value in shillings
	var TreasureJewels = [
		["Dwarven Beard Clasp", "A $MINORMOD $MAYBEFINE dwarf's [$METALTRIMS] beard-clasp.", 5, 0, 2],
		["Dwarven Beard Clasp", "A $MINORMOD $MAYBEFINE dwarf's [$METALMATERIAL] beard-clasp $DWARFDECORATION.", 5, 0, 2],

		["Elven Head Band", "A $MINORMOD $MAYBEFINE elven [$METALTRIMS] head band with a $INLAYGEMS set in the front.", 10, 0, 2],

		["Cloak Clasp", "A $MINORMOD $MAYBEFINE [$METALTRIMS] cloak clasp.", 4, 0, 1],
		["Cloak Clasp", "A [$METALTRIMS] $MAYBEFINE cloak clasp in the shape of $SHAPE.", 5, 0, 1],

		["Belt Buckle", "A $MINORMOD [$METALTRIMS] $MAYBEFINE belt buckle.", 4, 0, 1],
		["Belt Buckle", "A $QUALITY [$METALTRIMS] $MAYBEFINE belt buckle.", 8, 0, 1],
		["Belt Buckle", "A [$METALMATERIAL] $MAYBEFINE belt buckle shaped like a $FIERCEANIMAL's head.", 6, 0, 1],
		["Belt Buckle", "A [$METALMATERIAL] $MAYBEFINE belt buckle in the shape of $SHAPE.", 5, 0, 1],

		["Bracelet", "A [$METALTRIMS] $MAYBEFINE bracelet $DECORATION.", 20, 0, 1],
		["Bracelet", "A [$METALTRIMS] $MAYBEFINE bracelet inset with $INLAYGEMS.", 6, 0, 1],
		["Bracelet", "A [$METALMATERIAL] $MAYBEFINE bracelet with $METALTRIMS highlights.", 5, 0, 1],

		["Ring", "A $MINORMOD [$METALMATERIAL] ring.", 3, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_ring.png"],
		["Ring", "A [$METALMATERIAL] $MAYBEFINE ring $DECORATION.", 4, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_ring.png"],
		["Ring", "A [$METALMATERIAL] $MAYBEFINE ring with a $INLAYGEMS inset.", 5, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_ring.png"],
		["Signet Ring", "A [$METALTRIMS] $MAYBEFINE signet ring with an intrincated design.", 50, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_ring.png"],

		["Necklace", "A $MINORMOD $MAYBEFINE [$METALTRIMS] necklace.", 20, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_necklace.png"],
		["Pendant", "A [$METALMATERIAL] $MAYBEFINE pendant in the shape of $SHAPE.", 6, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_necklace.png"],
		["Pendant", "A [$METALMATERIAL] $MAYBEFINE pendant in the shape of $SHAPE, strung from a $JEWELSTRING necklace.", 6, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_necklace.png"],
		["Pendant", "A [$ANYMATERIAL] $MAYBEFINE pendant on a $JEWELSTRING.", 4, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_necklace.png"],

		["Neck Chain", "A [$CHAINMETAL] $CRAFTFINE heavy ceremonial neck chain.", 20, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_necklace.png"],
		["Neck Chain", "A [$CHAINMETAL] $CRAFTFINE heavy ceremonial neck chain with plaque $DECORATION.", 20, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_necklace.png"],

		["Earring", "A $MINORMOD $MAYBEFINE [$METALMATERIAL] earring.", 3, 0, 1],
		["Earring", "An $MAYBEFINE earring made of [$METALMATERIAL] and $DECORATION.", 3, 0, 1],
		["Pair of Earrings", "A [$INLAYGEMS-studded] $MAYBEFINE earring.", 4, 0, 1],
		["Pair of Earrings", "A $MINORMOD $MAYBEFINE pair of earrings made of [$METALMATERIAL].", 6, 0, 1],
		["Earring", "An $MAYBEFINE earring made of [$METALTRIMS] with a $INLAYGEMS inset.", 4, 0, 1],

		["Holy Symbol", "A $MINORMOD $MAYBEFINE [$ANYMATERIAL] symbol of $DEITY.", 6, 0, 1],
		["Holy Statuette", "A $QUALITY $MAYBEFINE [$ANYMATERIAL] statuette of the god $DEITY.", 6, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_statuette.png","misc"],

		["Rare Coin", "A rare [$METALMATERIAL] coin $DECORATION.", 2, 0, 3],
		["Set of Buttons", "A set of $CRAFTFINE " + (roll = (roll1d10() + 4)) + " $METALMATERIAL buttons each mounted with a $INLAYGEMS.", roll / 2, 0, 1],

		["Metal Ingot", "An ingot of [$METALMATERIAL].", 10, 1, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_ingot.png","misc"],
		["Stamped Metal Ingot", "An ingot of [$METALMATERIAL] stamped with a seal of $PLACE authorities.", 10, 1, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_ingot.png","misc"]

	];


	var TreasureClothing = [
		["Fur Cloak", "A <I>fine</I> [$FUR] cloak with $TRIMMING trimmings.", 20, 1, 1],
		["Fur Cloak", "A <I>fine</I> warm [$FUR] cloak with $TRIMMING trimmings.", 22, 1, 1],
		["Cloak", "A <I>fine</I> [$COLOUR] cloak $EMBROIDED with $COLOUR $PATTERN.", 20, 1, 1],
		["Fur Cloak", "A $MAYBEFINE $MINORMOD [$FUR] cloak.", 13, 1, 1],
		["Cloak", "A $MAYBEFINE [$COLOUR] cloak with $TRIMMING trimmings.", 12, 1, 1],
		["Cloak", "A $MINORMOD [$COLOUR] cloak $CLOTHCHARACTER.", 10, 1, 1],
		["Cloak", "A $MAYBEFINE [$COLOUR] cloak. It has a $JEWELSTRING to tie it.", 10, 1, 1],
		["Cloak", "A $MAYBEFINE [$COLOUR] cloak $EMBROIDED with the shape of $SHAPE.", 10, 1, 1],
		["Cloak", "An <I>ugly</I> $COLOUR cloak $CLOTHCHARACTER.", 5, 1, 1],
		["Cloak", "A $BADCLOTH <I>shoddy</I> $COLOUR cloak $CLOTHCHARACTER.", 5, 1, 1],

		["Coat", "A <I>fine</I> $FUR coat.", 36, 1, 1],
		["Coat", "A <I>fine</I> warm $FUR coat with $TRIMMING trimmings.", 38, 1, 1],
		["Coat", "A $GOODCLOTH <I>fine</I> $COLOUR coat.", 36, 1, 1],
		["Coat", "A <I>fine</I> $COLOUR coat. It's $CLOTHDECORATION.", 36, 1, 1],
		["Coat", "A $MAYBEFINE [$FUR] coat with $TRIMMING trimmings.", 24, 1, 1],
		["Coat", "A $MAYBEFINE $MINORMOD [$FUR] coat $BUTTONSCHARACTER $SIZED.", 24, 1, 1],
		["Coat", "A $MINORMOD [$COLOUR] coat $CLOTHCHARACTER $BUTTONSCHARACTER $SIZED.", 18, 1, 1],
		["Coat", "A [$COLOUR] coat with $TRIMMING trimmings.", 18, 1, 1],
		["Coat", "A <I>bulky</I> $COLOUR coat, with large pockets and ill sewn.", 9, 1, 1],
		["Coat", "An <I>ugly</I> $COLOUR coat $CLOTHCHARACTER $BUTTONSCHARACTER.", 9, 1, 1],
		["Coat", "A $BADCLOTH <I>shoddy</I> $COLOUR coat $CLOTHCHARACTER $BUTTONSCHARACTER.", 9, 1, 1],

		["Robes", "A $GOODCLOTH <I>fine</I> set of $COLOUR ornate robes.It's $CLOTHDECORATION.", 80, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_robe.png"],
		["Robes", "A $GOODCLOTH <I>fine</I> set of silky $COLOUR ornate robes.", 80, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_robe.png"],
		["Robes", "A $MINORMOD set of $COLOUR robes $CLOTHCHARACTER.", 40, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_robe.png"],
		["Robes", "A set of $COLOUR robes. It's $EMBROIDED with the shape of $SHAPE.", 40, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_robe.png"],
		["Robes", "A set of $COLOUR robes. It's $CLOTHDECORATION.", 40, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_robe.png"],
		["Priestly Robes", "A priestly set of $COLOUR robes. It's $EMBROIDED with prayers to $DEITY.", 40, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_robe.png"],
		["Robes", "A <I>bulky</I> set of $COLOUR robes. It has sewn $ANYMATERIAL beads of all over it.", 20, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_robe.png"],
		["Robes", "An <I>ugly</I> set of $COLOUR robes $CLOTHCHARACTER.", 20, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_robe.png"],

		["Gloves", "A $GOODCLOTH <I>fine</I> pair of $COLOUR gloves $CLOTHCHARACTER.", 8, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_gloves.png"],
		["Gloves", "A <I>fine</I> pair of $COLOUR dyed leather gloves.", 8, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_gloves.png"],
		["Gloves", "A pair of $COLOUR gloves $CLOTHCHARACTER.", 4, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_gloves.png"],
		["Gloves", "A $MINORMOD pair of $COLOUR gloves $CLOTHCHARACTER.", 4, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_gloves.png"],
		["Gloves", "A pair of $COLOUR dyed leather gloves $CLOTHCHARACTER.", 6, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_gloves.png"],
		["Gloves", "A $BADCLOTH <I>shoddy</I> pair of $COLOUR gloves $CLOTHCHARACTER.", 2, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_gloves.png"],
		["Gloves", "A $BADCLOTH <I>ugly</I> pair of $COLOUR gloves $CLOTHCHARACTER.", 2, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_gloves.png"],

		["Shoes", "A pair of $GOODCLOTH <I>fine</I> $COLOUR shoes. Made by a renowed master artisan from $CITY.", 10, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Shoes", "A $MINORMOD pair of $COLOUR shoes.", 5, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Shoes", "A pair of [$COLOUR] dyed leather shoes.", 5, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Shoes", "A pair of wellworn but [serviceable] $MAYBECOLOUR leather shoes.", 5, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Shoes", "A pair of $MAYBECOLOUR leather shoes with $METALMATERIAL buckles.", 6, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Shoes", "A pair of $BADCLOTH <I>shoddy</I> leather shoes.", 2.5, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],

		["Boots", "A pair of $GOODCLOTH <I>fine</I> $COLOUR boots. Made by a renowed master artisan from $CITY.", 10, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Boots", "A pair of [$COLOUR] dyed leather boots.", 5, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Boots", "A pair of [$COLOUR] dyed leather boots with wide cuffs.", 6, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Boots", "A pair of $MAYBEFINE $MAYBECOLOUR leather boots with $METALMATERIAL buckles.", 6, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Boots", "A $STAINS pair of [$COLOUR] dyed leather boots.", 5, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Boots", "A pair of [army] $MAYBEFINE boots with button-back cuffs. The buttons are $METALMATERIAL.", 5, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],
		["Boots", "A <I>bulky</I> pair of leather boots with $METALMATERIAL buckles.", 2.5, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_boots.png"],

		["Clothes", "A <I>fine</I> $COLOUR shirt $CLOTHCHARACTER and a $COLOUR vest and pants $SIZED.", 12, 1, 1],
		["Clothes", "A $MINORMOD matching [$COLOUR] shirt, vest $BUTTONSCHARACTER and pants $SIZED.", 6, 1, 1],
		["Clothes", "A $MINORMOD white shirt, a $COLOUR vest $BUTTONSCHARACTER and pants $SIZED.", 6, 1, 1],
		["Clothes", "A $STAINS matching [$COLOUR] shirt, vest and pants $SIZED.", 5, 1, 1],
		["Clothes (Dress and Skirts)", "A $MINORMOD [$COLOUR] dress $CLOTHCHARACTER $BUTTONSCHARACTER and skirts $SIZED.", 6, 1, 1],

		["Hood", "A $MINORMOD [$COLOUR] hood $CLOTHCHARACTER.", 5, 0, 1],
		["Hood", "A $BADCLOTH <I>ugly</I> $COLOUR hood $CLOTHCHARACTER.", 2.5, 0, 1],


		["Hat", "A $GOODCLOTH <I>fine</I> $COLOUR hat.", 8, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_hat.png"],
		["Hat", "A $GOODCLOTH <I>fine</I> $COLOUR and $COLOUR hat.", 8, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_hat.png"],
		["Feathered Hat", "A [$COLOUR] hat with [three $COLOUR feathers].", 5, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_hat.png"],
		["Hat (Hunter's Cap)", "A $MINORMOD hunter's cap with a $COLOUR feather.", 4, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_hat.png"],
		["Hat", "A $MINORMOD [$COLOUR] hat.", 4, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_hat.png"],
		["Hat", "A $BADCLOTH <I>ugly</I> $COLOUR hat.", 2, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_hat.png"],
		["Feathered Hat", "An oversized <I>bulky</I> $COLOUR hat with too many $MINORMOD $MAYBECOLOUR feathers.", 2, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_hat.png"],

		["Uniform", "A $GOODCLOTH <I>fine</I> [$COLOUR] uniform with $COLOUR accents.", 44, 1, 2],
		["Uniform", "An army officer <I>fine</I> $COLOUR and $COLOUR uniform $CLOTHCHARACTER.", 44, 1, 2],
		["Uniform", "A $MINORMOD [$COLOUR] uniform $BUTTONSCHARACTER $SIZED.", 22, 1, 2],
		["Uniform", "A $COLOUR and $COLOUR uniform $BUTTONSCHARACTER $SIZED.", 22, 1, 2],
		["Uniform", "A $COLOUR and $COLOUR military uniform.", 22, 1, 2],
		["Uniform", "A $STAINS [$COLOUR] uniform $CLOTHCHARACTER.", 18, 1, 2],
		["Uniform", "An <I>ugly</I> $COLOUR servant's uniform $BUTTONSCHARACTER.", 11, 1, 2],
		["Uniform", "A <I>bulky</I> $COLOUR and $COLOUR militia uniform $CLOTHCHARACTER.", 11, 1, 2],
		["Uniform", "A $BADCLOTH <I>shoddy</I> $COLOUR militia uniform $CLOTHCHARACTER.", 11, 1, 2],
		["Uniform", "A $STAINS and $BADCLOTH <I>shoddy</I> $COLOUR uniform $CLOTHCHARACTER.", 11, 0, 2]

	];

	var TreasureArmour = [
	["Leather Jerkin","A $MAYBECOLOUR leather jerkin $BUTTONSCHARACTER $SIZED.",10, 1, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","softLeather",[1,0,0,0,0,0]],
	["Leather Jerkin","A $GOODORBADCLOTH $MAYBECOLOUR leather jerkin $BUTTONSCHARACTER.",10, 1, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","softLeather",[1,0,0,0,0,0]],
	["Leather Jerkin","A $BADQUALITY $BADCLOTH $MAYBECOLOUR leather jerkin $BUTTONSCHARACTER.", 5, 1, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","softLeather",[1,0,0,0,0,0]],
	["Leather Jerkin","A <i>fine</i> leather jerkin of good quality $COLOUR leather $CLOTHDECORATION.", 20, 1, 2, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","softLeather",[1,0,0,0,0,0]],
	["Leather Leggings","A $MAYBECOLOUR leather leggings.",14, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_legarmour.png","armour","softLeather",[0,0,0,0,1,1]],
	["Leather Leggings","A $GOODORBADCLOTH $MAYBECOLOUR leather leggings.",14, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_legarmour.png","armour","softLeather",[0,0,0,0,1,1]],
	["Leather Jack","A $MAYBECOLOUR leather jack $BUTTONSCHARACTER $SIZED.",12, 1, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","softLeather",[1,0,1,1,0,0]],
	["Leather Jack","A $GOODORBADCLOTH $MAYBECOLOUR leather jack $BUTTONSCHARACTER.",12, 1, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","softLeather",[1,0,1,1,0,0]],
	["Leather Jack","A $BADQUALITY $BADCLOTH $MAYBECOLOUR leather jack $BUTTONSCHARACTER.", 6, 1, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","softLeather",[1,0,1,1,0,0]],
	["Leather Skullcap","A $MINORMOD $MAYBECOLOUR leather skullcap.",8, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_helm.png","armour","softLeather",[0,1,0,0,0,0], 0,0,["partial"]],
	["Leather Skullcap","A $GOODORBADCLOTH $MINORMOD $MAYBECOLOUR leather skullcap.",8, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_helm.png","armour","softLeather",[0,1,0,0,0,0], 0,0,["partial"]],

	["Leather Armour","A $MAYBECOLOUR full set of leather armour (<I>leather jack, leggins and skullcap</I>).",34, 2, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","softLeather",[1,1,1,1,1,1]],
	["Leather Armour","A $MAYBEFINE $MAYBECOLOUR full set of leather armour (<I>leather jack, leggins and skullcap</I>) $CLOTHDECORATION.",34, 2, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","softLeather",[1,1,1,1,1,1]],

	["Boiled Leather Breastplate","A $MAYBECOLOUR boiled leather breastplate.",18, 2, 2, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","boiledLeather",[2,0,0,0,0,0], 0,0,["weakpoints"]],
	["Boiled Leather Breastplate","A $GOODQUALITY $MAYBECOLOUR boiled leather breastplate $DECORATION.",36, 2, 2, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","boiledLeather",[2,0,0,0,0,0], 0,0,["weakpoints"]],
	["Mail Shirt","A mail shirt $MAILDECORATIONS.",40,2, 2, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","mail",[2,0,0,0,0,0],0,["flexible"]],
	["Mail Coat","A mail coat $MAILDECORATIONS $SIZED.",60,3, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","mail",[2,0,2,2,0,0],0,["flexible"]],
	["Mail Coat","A mail coat.",60,3, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","mail",[2,0,2,2,0,0],0,["flexible"]],
	["Mail Coat","A $GOODQUALITY mail coat $MAILDECORATIONS.",120,3, 1, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","mail",[2,0,2,2,0,0],0,["flexible"]],
	["Mail Chausses","A set of mail chausses $MAILDECORATIONS.",40,3, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_legarmour.png","armour","mail",[0,0,0,0,2,2],0,["flexible"]],
	["Mail Hauberk","A long mail hauberk covering all the limbs and body $MAILDECORATIONS.",100, 5, 2, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","mail",[2,0,2,2,2,2],0,["flexible"]],
	["Plate Breastplate","A breastplate $WITHPAULDRONSANDTASSETS.",200,3, 2, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","plate",[2,0,0,0,0,0],0,["impenetrable"],["weakpoints"]],
	["Plate Breastplate","A $GOODQUALITY breastplate $WITHPAULDRONSANDTASSETS $DECORATION.",400,3, 2, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","plate",[2,0,0,0,0,0],0,["impenetrable"],["weakpoints"]],
	["Plate Bracers","A set of bracers.",160,3, 3, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","plate",[0,0,2,2,0,0],0,["impenetrable"],["weakpoints"]],
	["Plate Bracers","A $GOODQUALITY set of metal bracers $DECORATION.",320,3, 3, "modules/wfrp4e-core/icons/equipment/armour/armour.png","armour","plate",[0,0,2,2,0,0],0,["impenetrable"],["weakpoints"]],

	["Plate Open Helm","An open helm $HELMDECORATIONS.",40, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_helm.png","armour","plate",[0,2,0,0,0,0],"-10 Perception",0,["partial"]],
	["Plate Open Helm","An <I>durable</I> reinforced open helm.",80, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_helm.png","armour","plate",[0,2,0,0,0,0],"-10 Perception",0,["partial"]],
	["Plate Padded Open Helm","A watchman's $MAYBECOLOUR leather skullcap and pot helmet $WRITING with the $CITY crest.",48, 2, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_helm.png","armour","plate",[0,3,0,0,0,0],"-10 Perception",0,["partial"]],
	["Plate Open Helm","A $MAYBEFINE open helm $DECORATION.",40, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_helm.png","armour","plate",[0,2,0,0,0,0],"-10 Perception",0,["partial"]],
	["Plate Helm","A helm $HELMDECORATIONS.",60,2, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_helm.png","armour","plate",[0,2,0,0,0,0],"-10 Perception",["impenetrable"],["weakpoints"]],

	["Shield (Buckler)","A $MAYBECOLOUR buckler",18+2/12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+1", "personal",["shield","defensive"],["undamaging"]],
	["Shield (Buckler)","A buckler painted $COLOUR and $COLOUR.",18+2/12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+1", "personal",["shield","defensive"],["undamaging"]],
	["Shield (Buckler)","A $GOODWOODENPREFIX $GOODQUALITY buckler painted $COLOUR with a $METALFITTING boss.",36+4/12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+1", "personal",["shield","defensive"],["undamaging"]],

	["Shield","A $BADWOODENPREFIX $BADQUALITY wooden shield $SHIELDEXTRAS.",20, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+2", "personal",["shield","defensive"],["undamaging"]],
	["Shield","A $MAYBECOLOUR shield $SHIELDEXTRAS.",40, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+2", "personal",["shield","defensive"],["undamaging"]],
	["Shield","A $NEUTRALWEAPONPREFIX shield painted $SHIELDDECORATIONS $SHIELDCHARGES $SHIELDEXTRAS.",40, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+2", "personal",["shield","defensive"],["undamaging"]],
	["Shield","A $GOODWOODENPREFIX $GOODQUALITY shield painted $SHIELDCOLOURS with $SHIELDCOLOURS $PATTERN and $METALFITTING fittings.",80, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+2", "personal",["shield","defensive"],["undamaging"]],
	["Shield","A $GOODWOODENPREFIX $GOODQUALITY shield painted $SHIELDDECORATIONS $SHIELDCHARGES $SHIELDEXTRAS.",80, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+2", "personal",["shield","defensive"],["undamaging"]],

	["Shield (Large)","A $MAYBECOLOUR large shield $SHIELDEXTRAS.",60, 3, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+3", "personal",["shield","defensive"],["undamaging"]],
	["Shield (Large)","A $NEUTRALWEAPONPREFIX large shield painted $SHIELDDECORATIONS $SHIELDCHARGES $SHIELDEXTRAS.",60, 3, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+3", "personal",["shield","defensive"],["undamaging"]],
	["Shield (Large)","A $GOODWOODENPREFIX $GOODQUALITY large shield painted $SHIELDCOLOURS with $SHIELDCOLOURS $PATTERN and $METALFITTING fittings.",120, 3, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+3", "personal",["shield","defensive"],["undamaging"]],
	["Shield (Large)","A $GOODWOODENPREFIX $GOODQUALITY large shield painted $SHIELDDECORATIONS $SHIELDCHARGES $SHIELDEXTRAS.",120, 3, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_shield.png", "weapon", "SB+3", "personal",["shield","defensive"],["undamaging"]]
	];


	var TreasureDocuments = [

		["Map", "A $MINORMOD map of $PLACE.", 60, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["Map", "A <I>fine</i> detailed map map of $PLACE. It's full of inscriptions in $LANGUAGE.", 120, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["Map", "A $PAPERDAMAGED map of $PLACE.", 55, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["Map", "A colorfull but <I>unreliable</i> map of $PLACE.", 30, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],

		["Paper", "A couple of dozen sheets (24) of $PAPERDAMAGED parchment.", 24, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["Paper", "A stack of " + (roll = (roll1d10() + 5)) + " sheets of blank parchment.", roll, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["Paper", "A $PAPERDAMAGED stack of " + (roll = (roll1d10() + 5)) + " sheets of blank parchment.", roll / 2, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["Paper", "A two-score (40) bunch of parchments.", 40, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["Paper", "A stack of " + (roll = (roll1d10() + 3)) + " sheets of <I>fine</i> parchment.", roll * 2, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],

		["Paper", "A $PAPERDAMAGED sheet with some text in $LANGUAGE.", 1, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],

		["Documents", "A $PAPERDAMAGED set of documents from citizen of $PLACE.", 3, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["Documents", "A set of  documents from a citizen of $PLACE.", 3, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["Documents", "A badly-forged set of documents from a citizen of $PLACE.", 2.5, 0, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],

		["License", "A license to bear martial [weapons] in $CITY.", 3, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["License", "A license to bear guns and dueling [weapons] in $CITY.", 3, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["License", "A letter of bridge and road [tool] exemption for $PROVINCE.", 3, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["License", "A letter of road [tool] exemption for $PROVINCE.", 3, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],
		["License", "A license to practice [magical] arts in $PROVINCE, for a Journeyman wizard from $CITY.", 3, 0, 4, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],

		["Leaflets", "A $PAPERDAMAGED small stack of " + (roll = (roll1d10() + 3)) + " leaflets promoting the insurgence in $PLACE.", roll / 2, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_scroll.png"],

		["Book, Apothecary", "A $MAYBESIZE $MAYBECOLOUR book of apothecary lore $BOOKDECORATION. $MAYBETITLEAPOTHECARY", 160, 1, 2],
		["Book, Herbalism", "A $MAYBESIZE $MAYBECOLOUR book of apothecary lore and herbalism $BOOKDECORATION. $MAYBETITLEAPOTHECARY", 160, 1, 2],
		["Book, Art", "A $MAYBESIZE $MAYBECOLOUR book of art $BOOKDECORATION.", 100, 1, 2],
		["Book, Art", "A $MAYBESIZE $MAYBECOLOUR book detailing methods and examples of drawing and painting.", 100, 1, 2],
		["Book, Cryptography", "A $MAYBESIZE $MAYBECOLOUR book of crytography $BOOKDECORATION.", 160, 1, 4],
		["Book, Engineering", "A $MAYBESIZE <I>unreliable</I> $MAYBECOLOUR book of engineering. It's full of erratas and misprints. $MAYBETITLEENGINEERING", 30, 1, 1],
		["Book, Engineering", "A $MAYBESIZE $MAYBECOLOUR book of general engineering $BOOKDECORATION. $MAYBETITLEENGINEERING", 60, 1, 2],
		["Book, Construction", "A $MAYBESIZE $MAYBECOLOUR book of construction engineering $BOOKDECORATION.", 60, 1, 2],
		["Book, Law", "A $MAYBESIZE $MAYBECOLOUR book of law $BOOKDECORATION. $MAYBETITLELAW", 300, 1, 4],
		["Book, Law", "A $MAYBESIZE <I>practical</I> $MAYBECOLOUR textbook of law from $PLACE. $MAYBETITLELAW", 600, 1, 4],
		["Book, Magic", "A $MAYBESIZE $MAYBECOLOUR book of magic. It's possesion could be legally troublesome $MAYBEBULKYDURABLE. $MAYBETITLEMAGIC", 400, 1, 4],
		["Book, Medicine", "A $MAYBESIZE $MAYBECOLOUR book of medicine, detailing ailments. $MAYBETITLEMEDICINE", 300, 1, 3],
		["Book, Medicine", "A $MAYBESIZE $MAYBECOLOUR book of anatomy and medicine $BOOKDECORATION.", 300, 1, 3],
		["Book, Religion", "A $MAYBESIZE $MAYBECOLOUR book of religion, written for $FOLLOWERS of $DEITY.", 20, 1, 1],
		["Book, Religion", "A $MAYBESIZE $MAYBECOLOUR book of religion $BOOKDECORATION$MAYBEBULKYDURABLE. $MAYBETITLERELIGION", 20, 1, 1],
		["Book, Religion", "'The life of $SAINT', a $MAYBESIZE $MAYBECOLOUR book of religion $BOOKDECORATION.", 20, 1, 1],
		["Book, History", "A $MAYBESIZE $MAYBECOLOUR book of history $BOOKDECORATION. $MAYBETITLEHISTORY", 20, 1, 1],
		["Book, Heraldry", "A $MAYBESIZE $MAYBECOLOUR book of heraldry $BOOKDECORATION. $MAYBETITLEHERALDRY", 20, 1, 1],
		["Book, Science", "A $MAYBESIZE $MAYBECOLOUR book of Natural Sciences $BOOKDECORATION. $MAYBETITLESCIENCE", 60, 1, 2],
		["Book, Poetry", "A $MAYBESIZE $MAYBECOLOUR book of bad poetry $BOOKDECORATION.", 19, 1, 1],
		["Book, Poetry", "A $MAYBESIZE $MAYBECOLOUR book of poetry $BOOKDECORATION.", 20, 1, 1],
		["Book, Novel", "A <I>fine</I> $MAYBESIZE $MAYBECOLOUR book of adventures, it's a collector edition.", 40, 1, 2],
		["Book, Cooking", "A $MAYBESIZE $MAYBECOLOUR book of cooking recipes $BOOKDECORATION.", 20, 1, 1],
		["Book, Theatre Play", "A $MAYBESIZE $MAYBECOLOUR book with a bad theatre play.", 19, 1, 1],
		["Book, Theatre Play", "A $MAYBESIZE $MAYBECOLOUR book with a theatre play.", 20, 1, 1]
	];
	var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TreasureCoins = [
		["Chest", "A $GOODWOODENPREFIX $WOODMATERIAL chest| with coins. It has " + (rolls[1] = roll2d10() + 2) + " gold crowns, " + (rolls[2] = roll2d10() * roll2d10() + 1) + " silver shillings and " + (rolls[3] = roll2d10() * roll2d10() + 10) + " pennies.", 8, 1, 4, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png", "container", 8, false, rolls[1], rolls[2], rolls[3]],
		["Coin-box", "A secure </I>durable</I> $METALMATERIAL coin-box hanging on a chain necklace|. It contains " + (rolls[4] = roll1d10() + 2) + " gold crowns, " + (rolls[5] = roll2d10() + 10) + " tarnished shillings and several  (" + (rolls[6] = roll1d10() + 2) + ") brass pennies.", 12, 2, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png", "container", 4, false, rolls[4], rolls[5], rolls[6]],
		["Coin-box", "A coin box| with " + (rolls[7] = roll2d10() + 10) + " Crowns.", 2, 2, 0, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png", "container", 4, false, rolls[7], 0, 0],
		["Coin-box", "A $MINORMOD coin box| with " + (rolls[8] = roll2d10() + 2) + " karls.", 2, 2, 0, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png", "container", 4, false, rolls[8], 0, 0],
		["Pouch", "A heavy <I>fine</I> $MAYBECOLOUR pouch| filled with " + (rolls[9] = roll1d10() + 2) + " Gold Crowns.", 8 / 12, 0, 0, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 1, true, rolls[9], 0, 0],
		["Coin-box", "A $WOODMATERIAL coin box| with " + (rolls[10] = roll2d10() + 8) + " Crowns and " + (rolls[11] = roll2d10() + 10) + " Shillings .", 2, 2, 0, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png", "container", 4, false, rolls[10], rolls[11], 0],

		["A $MINORMOD $MAYBECOLOUR box| full with " + (rolls[12] = roll1d10() + 24) + " silver coins.", 1, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png", "container", 2, false, 0, rolls[12], 0],
		["Small Box", "A small $MAYBECOLOUR box| with " + (rolls[13] = roll2d10() + 12) + " silver coins.", 1, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png", "container", 2, false, 0, rolls[13], 0],
		["Box", "A $WOODMATERIAL box| with " + (rolls[14] = roll2d10() + 3) + " silver coins.", 2, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png", "container", 2, false, 0, rolls[14], 0],
		["Purse", "A $GOODORBADCLOTH purse| with " + (rolls[15] = roll1d10() + 9) + " silver coins.", 4 / 12, 0, 0, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 1, true, 0, rolls[15], 0],

		["Sack", "A sack| with " + (rolls[16] = roll2d10() * roll1d10() + 12) + " slightly rusted pennies.", 1 / 12, 2, 2, "modules/wfrp4e-core/icons/equipment/packs_and_containers/sack.png", "container", 4, true, 0, 0, rolls[16]],
		["Purse", "A $MINORMOD purse| with a " + (rolls[17] = roll1d10() + 1) + " silver shillings and " + (rolls[18] = roll2d10() + 3) + " pennies.", 4 / 12, 0, 0, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 1, true, 0, rolls[17], rolls[18]],
		["Pouch", "A $GOODORBADCLOTH $MAYBEFINE $MAYBECOLOUR pouch| with a " + (rolls[19] = roll2d10() + 24) + " brass pennies.", 2 / 12, 0, 0, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 1, true, 0, 0, rolls[19]],
		["Knotted Cloth", "A knotted piece of $MAYBECOLOUR cloth| with " + (rolls[20] = roll2d10() + 12) + " brass pennies.", 2 / 12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_rags.png", "container", 1, false, 0, 0, rolls[20]],
		["Pouch", "A $STAINS $MAYBECOLOUR pouch| with a " + (rolls[21] = roll2d10() + 6) + " pennies.", 4 / 12, 0, 0, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 1, true, 0, 0, rolls[21]],
		["Knotted Cloth", "A $BADCLOTH knotted piece of $MAYBECOLOUR cloth| with " + (rolls[22] = roll2d10() + 5) + " brass pennies.", 2 / 12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_rags.png", "container", 1, true, 0, 0, rolls[22]],
		["Purse", "A $BADCLOTH <I>ugly</I> purse| with " + (rolls[23] = roll2d10() + 2) + " pennies.", 1 / 12, 0, 0, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 1, true, 0, 0, rolls[23]],
		["Coin String", "A bit of string| with " + (rolls[24] = roll1d10() + 2) + " pierced pennies in it.", 1 / 12, 0, 0, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 0.5, true, 0, 0, rolls[24]]
	];

	var TreasureOthers = [
		["Flag", "A $STAINS and $GOODORBADCLOTH flag in the colours of the city of [$CITY].", 200, 3, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_flag.png"],
		["Flag", "A $STAINS and $GOODORBADCLOTH flag in the colours of [$PROVINCE].", 200, 3, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_flag.png"],

		["Backpack", "A <I>lightweight</I> $COLOUR dyed leather backpack.", 10, 2, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 4, true],
		["Backpack", "A $MINORMOD [leather] backpack.", 4.85, 2, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 4, true],
		["Backpack", "A $MINORMOD [$COLOUR] [canvas] backpack $CLOTHCHARACTER.", 4.85, 2, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 4, true],
		["Backpack", "A $BADCLOTH <I>shoddy</I> $COLOUR canvas backpack $CLOTHCHARACTER.", 2.5, 2, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 4, true],
		["Backpack", "A <I>bulky</I> backpack made of $COLOUR cloth and $WOODMATERIAL.", 2.4, 2, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 4, true],

		["Sling Bag", "A $MINORMOD [leather] sling bag.", 1, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 2, true],
		["Sling Bag", "A $MINORMOD [$COLOUR] [canvas] sling bag $CLOTHCHARACTER.", 1, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 2, true],
		["Sling Bag", "A $BADCLOTH <I>shoddy</I> $COLOUR canvas sling bag $CLOTHCHARACTER.", 0.5, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_backpack.png", "container", 2, true],

		["Telescope", "A $MAYBEFINE telescope with $METALTRIMS decorations.", 100, 0, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_telescope.png", "trapping", "toolsAndKits"],
		["Telescope", "A $MINORMOD $METALFITTING telescope.", 100, 0, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_telescope.png", "toolsAndKits"],

		["Perfume", "A $MINORMOD bottle of perfume.", 10, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_flãsk.png"],
		["Perfume", "A $QUALITY bottle of expensive <I>fine</i> perfume.", 20, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_flask.png"],

		["Writting Kit", "A $MAYBEFINE $MINORMOD writing kit in a $ANYMATERIAL box.", 40, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_quill.png"],
		["Writting Kit", "An <I>unreliable</i> writing kit in bad condition. It's stored in a $ANYMATERIAL box.", 20, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_quill.png"],

		["Bone Dice", "A $MINORMOD pair of bone dice.", 0.85, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_dice.png"],
		["Ivory Dice", "A pair of <I>fine</i>  ivory  dice with their pips painted $COLOUR.", 1.65, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_dice.png"],
		["Two Pairs of Dice", "Two pairs of bone dice, one of them loaded.", 2, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_dice.png"],

		["Deck of Cards", "A $MINORMOD deck of cards. It's a $CARDDECKS and their backs are $COLOUR.", 1, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_cards.png"],
		["Deck of Cards", "A $PAPERDAMAGED deck of cards. It's a $CARDDECKS and their backs are $COLOUR.", 1, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_cards.png"],


		["Comb", "A $QUALITY bone comb.", 10 / 12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_comb.png"],
		["Comb", "A $MINORMOD  <I>fine</i> ivory comb.", 20 / 12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_comb.png"],
		["Comb", "A <I>fine</i> silver comb  $DECORATION", 40 / 12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_comb.png"],

		["Trade Tools", "A $MAYBECOLOUR case containing $TRADETOOLS.", 60, 1, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_tradetools.png", "trapping", "toolsAndKits"],
		["Trade Tools", "A $MAYBECOLOUR elegant case containing $TRADETOOLS. All of it of good quality and of <I>practical</I> nature. It bears a $METALFITTING plaque the $CITY's guild sign.", 120, 1, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_tradetools.png", "trapping", "toolsAndKits"],

		["Faxtoryll", "A $MAYBECOLOUR jar with poultice made from Faxtoryll (or maybe not).", 15, 0, 4, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_flask.png", "trapping", "drugsPoisonsHerbsDraughts"],
		["Healing Draught", "A Healing Draught (or not) in a $MINORMOD $MAYBECOLOUR glass bottle.", 10, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_flask.png", "trapping", "drugsPoisonsHerbsDraughts"],
		["Healing Poultice", "A Healing poultice (or not) in a $MINORMOD $MAYBECOLOUR jar.", 12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_flask.png", "trapping", "drugsPoisonsHerbsDraughts"],
		["Wooden Teeth", "A $MINORMOD set of wooden teeth.", 10, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_teeth.png"],
		["Hook", "A $METALFITTING hook $DECORATION.", 3 + 4 / 12, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_hook.png"],

		["Military Drum", "A military drum, painted in $COLOUR and $COLOUR", 40, 1, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_drum.png"],
		["Mandolin", "A $MAYBEFINE mandolin $DECORATION", 40, 1, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_lute.png"],

		["Flute", "A $MINORMOD $MAYBEFINE flute $DECORATION", 20, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_flute.png"],
		["Tambourine", "A $WOODMATERIAL $MAYBEFINE tamborine $DECORATION", 20, 0, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_drum.png"],

		["Harp", "A $MAYBEFINE harp $DECORATION with $METALFITTING decorations", 80, 2, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_lyre.png"],
		["Large Drum", "A $MAYBEFINE large drum, painted in $COLOUR and $COLOUR $DECORATION", 80, 2, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_drum.png"],

		["Skull", "A human skull $DECORATION.", 4, 1, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_skull.png"],
		["Yarn", "A $MINORMOD ball of $COLOUR wool yarn.", 0.25, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_yarn.png"],
		["Pebble", "A pebble painted $COLOUR.", 0.13, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_stone.png"],
		["Balls", "A set of " + (rolls[25] = (Math.floor((roll1d10() + 2) / 3)) + 1) + " $COLOUR and $COLOUR balls.", rolls[25] * 5 / 12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_balls.png"],
		["Rags", "Some $STAINS $MAYBECOLOUR rags.", 0.20, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_rags.png"],
		["Dead Rats Pole", (rolls[26] = (roll1d10() + 1)) + " dead rats strung from a pole. Counts as an @Compendium[wfrp4e-core.trappings.mRU10yAWWWs5WoKt]{Improvised Weapon}.", 0.25 + 1 / 24 * rolls[26], 0, 1],

		["Reliquary", "A $MINORMOD $MAYBESIZE $ANYMATERIAL reliquary with $RELIC.", 20, 1, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_urn.png"],

		["Grappling Hook and Rope", "A Grappling Hook and " + (rolls[27] = (roll1d10() + 5)) + " yards of rope.", 30 + (rolls[27]) * 0.834, 2, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_grapple.png"],
		["Rope", "A coiled rope, " + (rolls[28] = (roll1d10() + 9)) + " yards.", (rolls[28]) * 0.834, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_rope.png"],
		["Rope", "A <I>shoddy</I> looking rope, " + (rolls[29] = (roll1d10() + 9)) + " yards, it could break under heavy loads.", (rolls[29]) * 0.834 / 2, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_rope.png"],

		["Candle", "A set of " + (rolls[30] = (roll1d10() + 1)) + " [$MAYBECOLOUR] candles tied with a $MAYBECOLOUR string. They illuminate 10 yards around when lit.", rolls[30] / 12, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_candle.png"],
		["Torch", "A bundle of " + (rolls[31] = (roll1d10() + 1)) + " torches. They illuminate 15 yards around when lit.", rolls[31] * 4 / 12, Math.floor(rolls[31] / 2), 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_torch.png"],
		["Lantern", "A $METALFITTING lantern. It illuminates 20 yards around.", 12, 1, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_lantern.png"],
		["Storm Lantern", "A $METALFITTING storm lantern.", 20, 1, 2, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_lantern.png"],
		["Storm Lantern", "A <I>durable</I> $METALFITTING storm lantern.", 40, 1, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_lantern.png"],
		["Davrich Lamp", "A $METALFITTING Davrich lamp used for minning.", 40, 1, 3, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_lantern.png"],
		["Match", "A small $ANYMATERIAL box with " + (rolls[32] = (roll1d10() + 1)) + " sulfur matches.", rolls[32] + 0.25, 0, 1, "modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_match.png"]
	];


	var TreasureWeapons = [
		["Hand Weapon", "A $NEUTRALWEAPONPREFIX $MINORMOD $HANDWEAPON.", 20, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Hand Weapon", "A $MINORMOD $HANDWEAPON $DECORATION.", 20, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Hand Weapon", "A $MINORMOD $HANDWEAPON $DECORATION. It has a $POMMELHANDLE.", 20, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Hand Weapon", "A $GOODWEAPONPREFIX $GOODQUALITY $HANDWEAPON. It has a $POMMELHANDLE.", 40, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Hand Weapon", "A $BADQUALITY $HANDWEAPON.", 10, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],

		["Dwarven Hand Weapon", "A $GOODWEAPONPREFIX <I>practical</I> and <I>durable</I> dwarven $HANDWEAPON $DWARFDECORATION.", 80, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],

		["Hand Weapon", "A $NEUTRALWEAPONPREFIX $MINORMOD $HANDWEAPON.", 20, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Hand Weapon", "A $MINORMOD $HANDWEAPON $DECORATION.", 20, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Hand Weapon", "A $MINORMOD $HANDWEAPON $DECORATION. It has a $POMMELHANDLE.", 20, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Hand Weapon", "A $GOODWEAPONPREFIX $GOODQUALITY $HANDWEAPON. It has a $POMMELHANDLE.", 40, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Hand Weapon", "A $BADQUALITY $HANDWEAPON.", 10, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],

		["Sword", "A $NEUTRALWEAPONPREFIX $MINORMOD $SWORD.", 20, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Sword", "A $MINORMOD $SWORD $DECORATION.", 20, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Sword", "A $MINORMOD $SWORD $DECORATION. It has a $POMMELHILTSCABBARD.", 20, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Sword", "A $GOODQUALITY $SWORD $GOODBLADEDECO. It has a $POMMELHILTSCABBARD.", 40, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],
		["Sword", "A $BADBLADEDECO $BADQUALITY $SWORD.", 10, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],

		["Elven Longsword", "A $GOODWEAPONPREFIX <I>fine</I> and <I>lightweight</I> elven leaf-shaped longsword $ELFDECORATION.", 80, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4"],

		["Dagger", "A $NEUTRALWEAPONPREFIX $MINORMOD $DAGGER.", 16, 0, 1, "modules/wfrp4e-core/icons/equipment/weapons/dagger.png", "weapon", "SB+2", "basic", "vShort"],
		["Dagger", "A $MINORMOD $DAGGER $DECORATION.", 16, 0, 1, "modules/wfrp4e-core/icons/equipment/weapons/dagger.png", "weapon", "SB+2", "vShort"],
		["Dagger", "A $MINORMOD $DAGGER $DECORATION. It has a $POMMELHILTSCABBARD.", 16, 0, 1, "modules/wfrp4e-core/icons/equipment/weapons/dagger.png", "weapon", "SB+2", "basic", "vShort"],
		["Dagger", "A $GOODQUALITY $DAGGER $GOODBLADEDECO. It has a $POMMELHILTSCABBARD.", 32, 0, 1, "modules/wfrp4e-core/icons/equipment/weapons/dagger.png", "weapon", "SB+2", "basic", "vShort"],
		["Dagger", "A $BADBLADEDECO $BADQUALITY $DAGGER.", 8, 0, 1, "modules/wfrp4e-core/icons/equipment/weapons/dagger.png", "weapon", "SB+2", "basic", "vShort"],


		["Knife", "A $MINORMOD knife. More an eating utensil than a weapon.", 8, 0, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+1", "vShort", 0,["undamaging"]],
		["Cheese Knife", "A $MINORMOD cheese knife. It's [$WRITING] with the [Edelpilzen] town's Cheese Maker Guild sign.", 8, 0, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+1", "vShort",0, ["undamaging"]],
		["Utility Knife", "A $GOODWEAPONPREFIX <I>practical</I> utility knife. A good cutting tool with a $WOODMATERIAL handle.", 16, 0, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+1", "vShort", 0,["undamaging"]],
		["Butcher Knife", "A <I>bulky</I> short butcher knife with a reinforced $WOODMATERIAL handle.", 4, 0, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+1", "vShort", 0,["undamaging"]],


		["Rapier","A $NEUTRALWEAPONPREFIX $MINORMOD rapier", 100, 1, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4","long",["fast","impale"]],
		["Rapier","A $MINORMOD rapier $DECORATION.", 100, 1, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4","long",["fast","impale"]],
		["Rapier","A $MINORMOD rapier $DECORATION. It has a $POMMELHILTSCABBARD.", 100, 1, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4","long",["fast","impale"]],
		["Rapier","A $GOODQUALITY rapier $GOODBLADEDECO. It has a $POMMELHILTSCABBARD.", 200, 1, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4","long",["fast","impale"]],
		["Rapier","A $BADBLADEDECO $BADQUALITY rapier.", 50, 1, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4","long",["fast","impale"]],
		["Foil","A $GOODQUALITY foil $GOODBLADEDECO. It has a $POMMELHILTSCABBARD.", 200, 1, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+3","average",["fast","impale","preciso"]],
		["Smallsword","A $GOODQUALITY smallsword $GOODBLADEDECO. It has a $POMMELHILTSCABBARD.", 160, 1, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+2","average",["fast","impale","precise"],["undamaging"]],


		["Zweihander", "A $NEUTRALWEAPONPREFIX $MINORMOD Zweihander.", 200, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+5", "twoHanded", "long", ["damaging", "hack"]],
		["Zweihander", "A $MINORMOD Zweihander $DECORATION.", 200, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+5", "twoHanded", "long", ["damaging", "hack"]],
		["Zweihander", "A $MINORMOD Zweihander $DECORATION. It has a $POMMELHILTSCABBARD.", 200, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+5", "twoHanded", "long", ["damaging", "hack"]],
		["Zweihander", "A $GOODQUALITY Zweihander $GOODBLADEDECO. It has a $POMMELHILTSCABBARD.", 400, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+5", "twoHanded", "long", ["damaging", "hack"]],
		["Zweihander", "A $BADBLADEDECO $BADQUALITY Zweihander.", 100, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+5", "twoHanded", "long", ["damaging", "hack"]],

		["Great Axe", "A $NEUTRALWEAPONPREFIX $MINORMOD Great Axe.", 80, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+6", "twoHanded", "long", ["impact", "hack"],
			["tiring"]
		],
		["Great Axe", "A $MINORMOD Great Axe $DECORATION.", 80, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+6", "twoHanded", "long", ["impact", "hack"],
			["tiring"]
		],
		["Great Axe", "A $MINORMOD Great Axe $DECORATION. It has a $POMMELHANDLE.", 80, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+6", "twoHanded", "long", ["impact", "hack"],
			["tiring"]
		],
		["Great Axe", "A $GOODWEAPONPREFIX $GOODQUALITY Great Axe $GOODBLADEDECO. It has a $POMMELHANDLE.", 160, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+6", "twoHanded", "long", ["impact", "hack"],
			["tiring"]
		],
		["Great Axe", "A $BADBLADEDECO $BADQUALITY Great Axe.", 40, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+6", "twoHanded", "long", ["impact", "hack"],
			["tiring"]
		],

		["Quaterstaff", "A $NEUTRALWEAPONPREFIX $MINORMOD Quaterstaff with $DANGLING tied to its $METALFITTING tip.", 3, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "long", ["defensive", "pummel"]],
		["Quaterstaff", "A $NEUTRALWEAPONPREFIX $MINORMOD Quaterstaff $STAFFDECORATION.", 3, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "long", ["defensive", "pummel"]],
		["Quaterstaff", "A $GOODWEAPONPREFIX $GOODQUALITY Quaterstaff $STAFFDECORATION.", 6, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "long", ["defensive", "pummel"]],
		["Quaterstaff", "A $BADWOODENPREFIX $BADQUALITY Quaterstaff $DECORATION.", 1.5, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "long", ["defensive", "pummel"]],

		["Spear", "A $NEUTRALWEAPONPREFIX $MINORMOD Spear with $DANGLING tied to its head.", 40, 3, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "vLong", ["impale"]],
		["Spear", "A $NEUTRALWEAPONPREFIX $MINORMOD Spear $DECORATION.", 40, 3, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "vLong", ["impale"]],
		["Spear", "A $GOODWEAPONPREFIX $GOODQUALITY Spear $DECORATION.", 80, 3, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "vLong", ["impale"]],
		["Spear", "A $BADWOODENPREFIX $BADQUALITY Spear $DECORATION.", 40, 3, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "vLong", ["impale"]],

		["Halberd", "A $NEUTRALWEAPONPREFIX $MINORMOD Halberd with $DANGLING tied to its head.", 15, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "long", ["defensive", "hack", "impale"]],
		["Halberd", "A $NEUTRALWEAPONPREFIX $MINORMOD Halberd $DECORATION.", 15, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "long", ["defensive", "hack", "impale"]],
		["Halberd", "A $GOODWEAPONPREFIX $GOODQUALITY Halberd $DECORATION.", 30, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "long", ["defensive", "hack", "impale"]],
		["Halberd", "A $BADWOODENPREFIX $BADQUALITY Halberd $DECORATION.", 15, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/axe.png", "weapon", "SB+4", "polearm", "long", ["defensive", "hack", "impale"]],

		["Bow", "A $NEUTRALWEAPONPREFIX $MINORMOD bow.", 80, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+3", "bow", 50],
		["Bow", "A $MINORMOD bow $DECORATION.", 80, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+3", "bow", 50],
		["Bow", "A $MINORMOD bow $DECORATION plus a bunch of " + (roll = roll1d10() + 4) + " arrows.", 80 + roll * 5 / 12, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+3", "bow", 50],
		["Bow", "A $GOODWEAPONPREFIX $GOODQUALITY bow.", 160, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+3", "bow", 50],
		["Bow", "A $NEUTRALWEAPONPREFIX $BADQUALITY bow.", 40, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+3", "bow", 50],

		["Bow", "A $NEUTRALWEAPONPREFIX $MINORMOD bow.", 80, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+3", "bow", 50],
		["Bow", "A $MINORMOD bow $DECORATION.", 80, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+3", "bow", 50],
		["Bow", "A $MINORMOD bow $DECORATION plus a bunch of " + (roll = roll1d10() + 4) + " arrows.", 80 + roll * 5 / 12, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+3", "bow", 50],
		["Bow", "A $GOODWEAPONPREFIX $GOODQUALITY bow.", 160, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+3", "bow", 50],
		["Bow", "A warped $BADQUALITY bow.", 40, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+3", "bow", 50],

		["Longbow", "A $NEUTRALWEAPONPREFIX $MINORMOD longbow.", 100, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+4", "bow", 100,["damaging"]],
		["Longbow", "A $MINORMOD $MAYBEFINE longbow $DECORATION.", 100, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+4", "bow", 100,["damaging"]],
		["Longbow", "A $MINORMOD longbow $DECORATION plus a bunch of " + (roll = roll1d10() + 4) + " arrows.", 100 + roll * 5 / 12, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+4", "bow", 100,["damaging"]],
		["Longbow", "A $GOODWEAPONPREFIX $GOODQUALITY longbow.", 200, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+4", "bow", 100,["damaging"]],
		["Longbow", "A $NEUTRALWEAPONPREFIX $BADQUALITY longbow.", 50, 3, 2, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+4", "bow", 100,["damaging"]],

		["Shortbow", "A $NEUTRALWEAPONPREFIX $MINORMOD shortbow.", 60, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+2", "bow", 20],
		["Shortbow", "A $MINORMOD shortbow $DECORATION.", 60, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+2", "bow", 20],
		["Shortbow", "A $MINORMOD shortbow $DECORATION plus a bunch of " + (roll = roll1d10() + 4) + " arrows.", 60 + roll * 5 / 12, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+2", "bow", 20],
		["Shortbow", "A $GOODWEAPONPREFIX $GOODQUALITY shortbow.", 120, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+2", "bow", 20],
		["Shortbow", "A $NEUTRALWEAPONPREFIX $BADQUALITY shortbow.", 30, 1, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+2", "bow", 20],

		["Pistol", "A $NEUTRALWEAPONPREFIX $MINORMOD $MAYBEFINE pistol $DECORATION.", 160, 0, 3, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "+8", "blackpowder", 20, ["pistol", "blackpowder", "damaging"],["reload"]],
		["Handgun", "A $NEUTRALWEAPONPREFIX $MINORMOD $MAYBEFINE handgun $DECORATION.", 80, 2, 2, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "+9", "blackpowder", 50, ["damaging", "blackpowder"],["reload","dangerous"]],
		["Blunderbuss", "A $NEUTRALWEAPONPREFIX $MINORMOD $MAYBEFINE blunderbuss $DECORATION.", 40, 1, 2, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "+8", "blackpowder", 20, ["damaging", "blackpowder"],["reload"]],

		["Crossbow", "A $NEUTRALWEAPONPREFIX $MINORMOD crossbow.", 100, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "+9", "crossbow", 60,0,["reload"]],
		["Crossbow", "A $MINORMOD $MAYBEFINE crossbow $DECORATION.", 100, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "+9", "crossbow", 60,0,["reload"]],
		["Crossbow", "A $MINORMOD crossbow $DECORATION plus a bunch of " + (roll = roll1d10() + 4) + " bolts.", 100 + roll * 5 / 12, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "+9", "crossbow", 60,0,["reload"]],
		["Crossbow", "A $GOODQUALITY crossbow.", 200, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "+9", "crossbow", 60,0,["reload"]],
		["Crossbow", "A $NEUTRALWEAPONPREFIX $BADQUALITY crossbow.", 50, 2, 1, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "+9", "crossbow", 60,0,["reload"]],

		["Elf Bow", "A $MINORMOD elf bow decorated with $COLOUR silk ribbons plus a bundle of " + (roll = roll1d10() + 3) + " $COLOUR feathered elf arrows.", 60 + roll * 6 / 12, 2, 4, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+4", "bow", 150, ["damaging", "precise"]],
		["Elf Bow", "A $GOODWEAPONPREFIX $GOODQUALITY elf bow. It's $INLAYGEMS-studded and has $METALFITTING tips and handle decorations.", 400, 2, 4, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+4", "bow", 150, ["damaging", "precise"]],
		["Elf Bow", "A $NEUTRALWEAPONPREFIX $BADQUALITY elf bow.", 100, 2, 4, "modules/wfrp4e-core/icons/equipment/weapons/bow.png", "weapon", "SB+4", "bow", 150, ["damaging", "precise"]]
		/*,

	["A powder horn $DECORATION and carrying "+(roll=roll2d10()+5)+" shots of gunpowder and a $MAYBECOLOUR bag with as many leaden bullets.",1+(3.25)*roll/12, 0, 1],
	["A $MAYBEFINE $METALMATERIAL powder flask $DECORATION and carrying "+(roll=roll2d10())+" shots of gunpowder and a $MAYBECOLOUR bag with as many leaden bullets.",2+(3.25)*roll/12, 0, 1],
	["A $MAYBEFINE $MAYBECOLOUR leather quiver $DECORATION, containing "+(roll=roll2d10()+3)+" arrows.", 5+roll*5/12, 1, 1],
	["A $MAYBEFINE $MAYBECOLOUR leather quiver $DECORATION, containing "+(roll=roll2d10()+3)+" crossbow bolts.", 5+roll*5/12, 1, 1]
	*/
	];

	var TreasureAll = [
		TreasureJewels,
		TreasureClothing,
		TreasureDocuments,
		TreasureCoins,
		TreasureOthers,
		TreasureWeapons,
		TreasureArmour
	];
	var TreasurePicDefaults = [
		"modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png",
		"modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_clothes.png",
		"modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_book.png",
		"modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png",
		"modules/wfrp4e-random-treasure/assets/icons/trappings/trappings_treasure.png",
		"modules/wfrp4e-core/icons/equipment/weapons/hand-weapon.png",
		"modules/wfrp4e-core/icons/equipment/armour/armour.png"
	];
	var TreasureTypeDefaults = [
		["trapping", "clothingAccessories"],
		["trapping", "clothingAccessories"],
		["trapping", "booksAndDocuments"],
		["trapping", "container"],
		["trapping", "misc"],
		["trapping", "weapon"],
		["trapping", "armour"]
	];

	function parseCoinage(TotalSilver) {
		var gold = 0;
		if (TotalSilver >= 20) {
			gold = Math.floor(TotalSilver / 20);
			TotalSilver = TotalSilver - gold * 20;
		}
		var silver = 0;
		if (TotalSilver >= 1) {
			silver = Math.floor(TotalSilver);
			TotalSilver = TotalSilver - silver;
		}
		var brass = Math.floor(TotalSilver * 12);
		return [gold, silver, brass];
	}

	function roll1d10() {
		"use strict";
		return Math.floor(Math.random() * 10) + 1;
	}

	function roll2d10() {
		"use strict";
		return Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 2;
	}

	function rollXd10(x) {
		"use strict";
		var j;
		var roll = 0;
		for (j = 0; j < x; j += 1) {
			roll += roll1d10();
		}
		return roll;
	}

	function roll1d100() {
		"use strict";
		return Math.floor(Math.random() * 100) + 1;
	}

	function removedoublespaces(str) {
		"use strict";
		str = str.replace(/ +(?= )/g, '');
		str = str.replace(/ \./g, '.');
		return str;
	}

	function aanmanagement(str) {
		"use strict";
		var strnew = str.replace(/\b(a)\s([aeiou])/ig, '$1n $2');
		strnew = strnew.replace(/\b(a)\s<I>([aeiou])/ig, '$1n <I>$2');
		return strnew;
	}


	function randomTreasure(TreasureType) {
		if (TreasureType == -1) {
			TreasureType = Math.floor(Math.random() * TreasureAll.length) + 1;
		}
		var treasure = TreasureAll[TreasureType - 1][Math.floor(Math.random() * TreasureAll[TreasureType - 1].length)];

		//Set the default pic for the category if none was given
		if (treasure.length < 6) {
			treasure.push(TreasurePicDefaults[TreasureType - 1]);
		}
		//Set the default type for the type and category if none was given
		if (treasure.length < 7) {
			treasure.push(TreasureTypeDefaults[TreasureType - 1][0]);
			treasure.push(TreasureTypeDefaults[TreasureType - 1][1]);
		}

		return treasure;
	}


	function parsemaybefine(parsedstr, valuemultiplier) {
		var lookingfor = "$MAYBEFINE";
		if (parsedstr.includes(lookingfor) == true) {
			if (valuemultiplier > 200) {
				parsedstr = parsedstr.replace(lookingfor, "<I>fine</I>");
			} else {
				parsedstr = parsedstr.replace(lookingfor, "");
			}
		}
		return parsedstr;
	}

	function parseencumbrance(parsedstr, encumbrance) {
		var badlookingfor = "<I>bulky</I>";
		var goodlookingfor = "<I>lightweight</I>";
		if (parsedstr.includes(badlookingfor) == true) {
			encumbrance = encumbrance + 1;
		}
		if (parsedstr.includes(goodlookingfor) == true) {
			encumbrance = Math.max(0, encumbrance - 1);
		}
		return encumbrance;
	}

	function parseAvailability(avalabilityval, parsedstr) {
		var val = avalabilityval;
		for (var i = 0; i < GOODQUALITY.length; i++) {
			if (parsedstr.includes(GOODQUALITY[i][0]) == true) {
				val = Math.min(4, val + 1);
			}
		}
		for (var i = 0; i < BADQUALITY.length; i++) {
			if (parsedstr.includes(BADQUALITY[i][0]) == true) {
				val = Math.max(1, val - 1);
			}
		}
		return Availability[val - 1];
	}

	function parsequalitiesflaws(descstring) {
		var qualitiesfound = [];
		var flawsfound = [];
		for (var i = 0; i < Qualities.length; i++) {
			if (descstring.toLowerCase().includes(Qualities[i].toLowerCase()) == true) {
				if (i < 4) {
					qualitiesfound.push(Qualities[i]);
				} else {
					flawsfound.push(Qualities[i]);
				}
			}
		}
		return [qualitiesfound, flawsfound];
	}

	function parsenameadjetives(descstring) {
		var adjstr = "";
		var qandf = parsequalitiesflaws(descstring);

		// Get a nice string with all "non-intrinsic" qualities and flaws
		adjstr = (qandf[0].join(" ") + " " + qandf[1].join(" ")).trim() + " ";

		// If no quality adjetives, lets try to get something from the desciption, between with []
		if (adjstr.trim() == "") {
			let adjrandom = Array.from(descstring.matchAll(/\[([^\][]*)]/g), x => x[1]);
			if (adjrandom.length > 0) {
				adjstr = adjrandom[Math.floor(Math.random() * adjrandom.length)] + " ";
				adjstr = adjstr.charAt(0).toUpperCase() + adjstr.slice(1);
			}
		}
		return adjstr;
	}

	function parsequalities(originalString) {
		var valuemultiplier = 100;
		var notdone = 1;
		while (notdone) {
			notdone = 0;
			for (var i = 0; i < ALLSTRINGS.length; i++) {
				var lookingfor = ALLSTRINGS[i][0];
				var strings = ALLSTRINGS[i][1];
				var randomnumber = Math.floor(Math.random() * strings.length);
				var replacement = strings[randomnumber][0];
				if (originalString.includes(lookingfor) == true) {
					valuemultiplier = valuemultiplier + strings[randomnumber][1];
					notdone = 1;
				}
				var originalString = originalString.replace(lookingfor, replacement);
			}
		}
		var parsedString = aanmanagement(removedoublespaces(parsemaybefine(originalString, valuemultiplier)));
		return [parsedString, Math.max(valuemultiplier / 100, 0.1)];
	}

	function getMoneyContainer(cgc, css, cbp, pimg, newdesc) {
		let effectsData = [{
			"disabled": false,
			"duration": {
				"startTime": null
			},
			"icon": pimg,
			"label": "Get Coins",
			"transfer": true,
			"flags": {
				"wfrp4e": {
					"effectTrigger": "oneTime",
					"effectApplication": "actor",
					"hide": false,
					"preventDuplicateEffects": false,
					"script": "let cgc = " + cgc + ";\nlet css = " + css + ";\nlet cbp = " + cbp + ";\nlet emptydesc = \"A tan pouch.\";\n\nfunction giveCoinsChangeDesciption ( cgc, css, cbp, emptydesc ) {\n        console.log(`Try to give currency: GC:${cgc}, SS:${css}, BP:${cbp}, to actor ${args.actor.id}`);\n\t\t\n        const currentCurrency = args.actor.data.items.filter(item => item.type === \"money\");\n\t\t\n        const currentGC = currentCurrency.find(currency => currency.data.name === \"Gold Crown\");\n        const currentSS = currentCurrency.find(currency => currency.data.name === \"Silver Shilling\");\n        const currentBP = currentCurrency.find(currency => currency.data.name === \"Brass Penny\");\n        const updateGC = {\n            \"data.quantity.value\": currentGC.data.data.quantity.value + cgc\n        };\n        currentGC.update(updateGC);\n        const updateSS = {\n            \"data.quantity.value\": currentSS.data.data.quantity.value + css\n        };\n        currentSS.update(updateSS);\n        const updateBP = {\n            \"data.quantity.value\": currentBP.data.data.quantity.value + cbp\n        };\n        currentBP.update(updateBP);\n        console.log(`Giving currency: GC:${cgc}, SS:${css}, BP:${cbp}, to actor ${args.actor.id}`);\n}\n\ngiveCoinsChangeDesciption (cgc, css, cbp, emptydesc);"
				}
			}
		}];
		return effectsData;
	}

	function generateTContainer(treasure) {
		var parsedtreasure = parsequalities(treasure[1]);
		//Add quality adjetives to the name
		var parsedname = parsenameadjetives(parsedtreasure[0]) + treasure[0];
		var parsedavailability = parseAvailability(treasure[4], parsedtreasure[0]);
		var pcoin = parseCoinage(treasure[2] * parsedtreasure[1]);
		var parsedencumbrance = parseencumbrance(parsedtreasure[0], treasure[3]);
		//default image just in case.
		var pimg = treasure[5];
		var ptype = treasure[6];
		var parseddes = parsedtreasure[0].replace("|", "").replace("[", "").replace("]", "").replace("{", "").replace("}", "");
		//Quick fix, just in case no money recorded
		treasure.push(0);
		treasure.push(0);
		treasure.push(0);
		//var barindesc = ((parseddes.indexOf("|") < 0) ? (parseddes.length-1) : parseddes.indexOf("|") );
		var macro = getMoneyContainer(treasure[9], treasure[10], treasure[11], pimg, parseddes);
		let item = Item.create({
			name: parsedname,
			type: ptype,
			img: pimg,
			data: {
				description: {
					value: parseddes
				},
				gmdescription: {
					value: 'Based on the generator at: https://pacomiscelaneousstuff.blogspot.com/2019/08/treasure-generator.html'
				},
				availability: {
					value: parsedavailability
				},
				encumbrance: {
					value: parsedencumbrance
				},
				carries: {
					value: treasure[7]
				},
				weareable: {
					value: treasure[8]
				},
				price: {
					gc: pcoin[0],
					ss: pcoin[1],
					bp: pcoin[2]
				}
			},
			effects: macro
		});
		return item;
	}


	function generateTWeapon(treasure) {
		var parsedtreasure = parsequalities(treasure[1]);
		//Add quality adjetives to the name
		var parsedname = parsenameadjetives(parsedtreasure[0]) + treasure[0];
		var qualitiesandflaws = parsequalitiesflaws(parsedtreasure[0]);
		var parsedavailability = parseAvailability(treasure[4], parsedtreasure[0]);
		var pcoin = parseCoinage(treasure[2] * parsedtreasure[1]);
		var parsedencumbrance = parseencumbrance(parsedtreasure[0], treasure[3]);
		//default image just in case.
		var pimg = treasure[5];
		var ptype = treasure[6];
		var parseddes = parsedtreasure[0];
		//Quick fix, just in case no money recorded
		treasure.push(0);
		treasure.push(0);
		treasure.push(0);
		treasure.push(0);
		treasure.push(0);
		let dataitem = {
			name: parsedname,
			type: ptype, //"type": "weapon",
			img: pimg,
			data: {
				description: {
					value: parseddes.replace("|", "").replace("[", "").replace("]", "").replace("{", "").replace("}", "")
				},
				gmdescription: {
					value: 'Based on the generator at: https://pacomiscelaneousstuff.blogspot.com/2019/08/treasure-generator.html'
				},
				availability: {
					value: parsedavailability
				},
				encumbrance: {
					value: parsedencumbrance
				},
				damage: {
					value: treasure[7]
				},
				weaponGroup: {
					value: (treasure[8] == 0 ? "basic" : treasure[8])
				},
				price: {
					gc: pcoin[0],
					ss: pcoin[1],
					bp: pcoin[2]
				}
				//,			( ((treasure[8] == "bow" ) ||(treasure[8] == "crossbow" ) ) ? ammunitionGroup:{value: treasure[8]} : reach: {value: "short"} )
			}
		};
		if ((treasure[8] == "bow") || (treasure[8] == "crossbow") || (treasure[8] == "blackpowder")) {
			dataitem.data.ammunitionGroup = {
				value: treasure[8]
			};
			dataitem.data.range = {
				value: (treasure[9] == 0 ? 30 : treasure[9])
			};
		} else {
			dataitem.data.reach = {
				value: (treasure[9] == 0 ? "average" : treasure[9])
			};
		}
		if ((treasure[8] == "bow") || (treasure[8] == "crossbow") || (treasure[8] == "polearm") || (treasure[8] == "twoHanded") || (treasure[8] == "blackpowder" && treasure[0] != "Pistol")) {
			dataitem.data.twohanded = {
				value: true
			};
		}
		if (treasure[10] != 0) {
			qualitiesandflaws[0] = qualitiesandflaws[0].concat(treasure[10]);
			console.log("Adding intrinsic qualities " + treasure[10] );
		}
		if (treasure[11] != 0) {
			qualitiesandflaws[1] = qualitiesandflaws[1].concat(treasure[11]);
			console.log("Adding intrinsic flaws " + treasure[11] );
		}
		console.log(qualitiesandflaws);
		if (qualitiesandflaws[0].length > 0) {
			dataitem.data.qualities = {
				value: []
			};
			for (var i = 0; i < qualitiesandflaws[0].length; i++) {
				console.log("Adding Quality :" + (qualitiesandflaws[0][i]).toLowerCase());
				dataitem.data.qualities.value.push({
					name: (qualitiesandflaws[0][i]).toLowerCase(),
					value: ((qualitiesandflaws[0][i] == "Fine" || qualitiesandflaws[0][i] == "Durable" ||  qualitiesandflaws[0][i] == "shield") ? 1 : null)
				});
			}
		}
		if (qualitiesandflaws[1].length > 0) {
			dataitem.data.flaws = {
				value: []
			};
			for (var i = 0; i < qualitiesandflaws[1].length; i++) {
				console.log("Adding Flaw :" + (qualitiesandflaws[1][i]).toLowerCase());
				dataitem.data.flaws.value.push({
					name: (qualitiesandflaws[1][i]).toLowerCase(),
					value: (qualitiesandflaws[1][i] == "reload" ? 1 : null)
				});
			}
		}
		console.log(dataitem);
		let item = Item.create(dataitem);
		return item;
	}


	function generateTArmour(treasure) {
		var parsedtreasure = parsequalities(treasure[1]);
		//Add quality adjetives to the name
		var parsedname = parsenameadjetives(parsedtreasure[0]) + treasure[0];
		var qualitiesandflaws = parsequalitiesflaws(parsedtreasure[0]);
		var parsedavailability = parseAvailability(treasure[4], parsedtreasure[0]);
		var pcoin = parseCoinage(treasure[2] * parsedtreasure[1]);
		var parsedencumbrance = parseencumbrance(parsedtreasure[0], treasure[3]);
		//default image just in case.
		var pimg = treasure[5];
		var ptype = treasure[6];
		var parseddes = parsedtreasure[0];
		//Quick fix, just in case no money recorded
		treasure.push(0);
		treasure.push(0);
		treasure.push(0);
		treasure.push(0);
		treasure.push(0);
		let dataitem = {
			name: parsedname,
			type: ptype, //"type": "armour",
			img: pimg,
			data: {
				description: {
					value: parseddes.replace("|", "").replace("[", "").replace("]", "").replace("{", "").replace("}", "")
				},
				gmdescription: {
					value: 'Based on the generator at: https://pacomiscelaneousstuff.blogspot.com/2019/08/treasure-generator.html'
				},
				availability: {
					value: parsedavailability
				},
				encumbrance: {
					value: parsedencumbrance
				},
				armorType: {
					value: treasure[7]
				},
				maxAP: {
					body : treasure[8][0],
					head : treasure[8][1],
					lArm : treasure[8][2],
					rArm : treasure[8][3],
					lLeg : treasure[8][4],
					rLeg : treasure[8][5]
				},
				price: {
					gc: pcoin[0],
					ss: pcoin[1],
					bp: pcoin[2]
				}
				//,			( ((treasure[8] == "bow" ) ||(treasure[8] == "crossbow" ) ) ? ammunitionGroup:{value: treasure[8]} : reach: {value: "short"} )
			}
		};
		if (treasure[9] != 0) {
			dataitem.data.penalty = treasure[9];
		}
		if (treasure[10] != 0) {
			qualitiesandflaws[0] = qualitiesandflaws[0].concat(treasure[10]);
			console.log("Adding intrinsic qualities " + treasure[10] );
		}
		if (treasure[11] != 0) {
			qualitiesandflaws[1] = qualitiesandflaws[1].concat(treasure[11]);
			console.log("Adding intrinsic flaws " + treasure[11] );
		}
		console.log(qualitiesandflaws);
		if (qualitiesandflaws[0].length > 0) {
			dataitem.data.qualities = {
				value: []
			};
			for (var i = 0; i < qualitiesandflaws[0].length; i++) {
				console.log("Adding Quality :" + (qualitiesandflaws[0][i]).toLowerCase());
				dataitem.data.qualities.value.push({
					name: (qualitiesandflaws[0][i]).toLowerCase(),
					value: ((qualitiesandflaws[0][i] == "Fine" || qualitiesandflaws[0][i] == "Durable" ||  qualitiesandflaws[0][i] == "shield") ? 1 : null)
				});
			}
		}
		if (qualitiesandflaws[1].length > 0) {
			dataitem.data.flaws = {
				value: []
			};
			for (var i = 0; i < qualitiesandflaws[1].length; i++) {
				console.log("Adding Flaw :" + (qualitiesandflaws[1][i]).toLowerCase());
				dataitem.data.flaws.value.push({
					name: (qualitiesandflaws[1][i]).toLowerCase(),
					value: (qualitiesandflaws[1][i] == "reload" ? 1 : null)
				});
			}
		}
		console.log(dataitem);
		let item = Item.create(dataitem);
		return item;
	}


	function generateTrapping(treasure) {
		var parsedtreasure = parsequalities(treasure[1]);
		//Add quality adjetives to the name
		var parsedname = parsenameadjetives(parsedtreasure[0]) + treasure[0];
		var parsedavailability = parseAvailability(treasure[4], parsedtreasure[0]);
		var pcoin = parseCoinage(treasure[2] * parsedtreasure[1]);
		var parsedencumbrance = parseencumbrance(parsedtreasure[0], treasure[3]);
		//default image just in case.
		var pimg = treasure[5];
		var ptype = "trapping";
		var pttype = treasure[6];
		var parseddes = parsedtreasure[0];

		let item = Item.create({
			name: parsedname,
			type: ptype,
			img: pimg,
			data: {
				description: {
					value: parseddes.replace("|", "").replace("[", "").replace("]", "").replace("{", "").replace("}", "")
				},
				gmdescription: {
					value: 'Based on the generator at: https://pacomiscelaneousstuff.blogspot.com/2019/08/treasure-generator.html'
				},
				trappingType: {
					value: pttype
				},
				availability: {
					value: parsedavailability
				},
				encumbrance: {
					value: parsedencumbrance
				},
				price: {
					gc: pcoin[0],
					ss: pcoin[1],
					bp: pcoin[2]
				}
			}
		});
		return item;
	}

	function generateTreasure(tt) {
		var treasure = randomTreasure(tt);
		var lootitem;
		switch (treasure[6]) {
			case "container":
				lootitem = generateTContainer(treasure);
				break;
			case "weapon":
				lootitem = generateTWeapon(treasure);
				break;
			case "armour":
				lootitem = generateTArmour(treasure);
				break;
			default:
				lootitem = generateTrapping(treasure);
		}
	return lootitem;
	}
	//-1 Random 1 Jewels 2 Clothes 3 Books 4 Coins 5 Misc 6 Weapons 7 Armour
	let lootitem = generateTreasure(treasuretype);
	
	lootitem.then(itl => ChatMessage.create(
	    {content: "<p>Generating :  @Item[" + itl.id + "]{" + itl.name + "}</p>"}, false)
	);
}