var dev_tool = ["dev_close()","unload()","reload()","debug_reload()","extanded_filter()","teams_selector()","teams()","reset()","team_expand()","debug_weapon_reload()"]
var developer_mode = 0
var closes = 0
var character = load_json("/json/characters.json")
var weapon = load_json("/json/weapon.json")
var teams_list = 0
var export_open = 0
var import_open = 0
const weekday = ["sunday","monday","tuesday","wednesday","monday","tuesday","wednesday"];
const weekday_full = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const teams_day = ["sunday","monday","tuesday","wednesday"]
const d = new Date();
let today = weekday[d.getDay()];
let today_full = weekday_full[d.getDay()];
function capitalize(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
function refresh(){window.location.href = window.location.href}
function load_json(file){
   var request = new XMLHttpRequest();
   request.open("GET", file, false);
   request.send(null)
   var jason = JSON.parse(request.responseText);
   return jason
}
if(getCookie("load") != 1){
reload()
var imp = window.location.href
if(imp.includes("import") == true){
    import_teams()
}

}
if(getCookie("developer") == 1){
    developer_mode = 9
    dev()
}
function reload(){
    unload()
    teams()
    developer_mode = 1
for (i = 0; i < character.length; i++){
    if(character[i].element_2 != null){
        var ele = character[i].element +" " + character[i].element_2+" "+character[i].element_3
        var traveler_image = getCookie("timage")
        if(traveler_image == "Aether"){
            traveler_image = character[i].image_male
        }else if(traveler_image == "Lumine"){
            traveler_image = character[i].image_female
        }else{
            traveler_image = character[i].image
        }
        console.log(traveler_image)
        create_image(character[i].name,traveler_image,character[i].hex,character[i].region,character[i].weapon,ele,character[i].rarity)
    }else{
    create_image(character[i].name,character[i].image,character[i].hex,character[i].region,character[i].weapon,character[i].element,character[i].rarity)
    }
}
}

function import_check(){
    var import_link = window.location.href
    if(import_link.search("import") != 0) import_teams(import_link)
}
function create_image(name,image,code,region,wepon,element,rare){
    var parent = document.getElementById("character")
    var character_img_container = document.createElement("div")
    var name_container = document.createElement("div")
    var img_container = document.createElement("div")
    var images = document.createElement("img")
    var names = document.createElement("p")
    var link = document.createElement("a")
    link.href = "/characters/"+name.replace(" ","_")+".html"
    names.innerText = name
    images.src = image
    name_container.classList.add("name")
    img_container.classList.add("img")
    name_container.appendChild(names)
    img_container.appendChild(images)
    character_img_container.appendChild(img_container)
    character_img_container.appendChild(name_container)
    character_img_container.classList.add("character_img")
    link.id = name + " " + region + " " + wepon +" "+element+" "+rare+"☆ "+code
    link.appendChild(character_img_container)
    parent.appendChild(link)
}
function unload(teams=0){
    const thing = document.getElementById("character").getElementsByTagName("a")
    const things = document.getElementById("character").getElementsByClassName("dev_cha_info")
    const list = thing.length
    const lists = things.length
    for (i = 0; i < list; i++){
        thing[0].remove()
    }
    for (i = 0; i < lists; i++){
        things[0].remove()
    }
    if(teams == 0) document.getElementById("teams").innerHTML = ""
}

function debug_reload(){
    document.getElementById("teams").innerHTML=""
unload()
developer_mode = 1
for (i = 0; i < character.length; i++){
    var vare = Object.keys(character[i])
    var a = character[i]
    var text = ""
    var ah = ""
    for (let x of vare) {
        text += x + ": " + a[x] + "<br>";
        ah += a[x]+" "
      }
      dev_info(character[i].image,text,character[i].full_image,ah)
}
}

function debug_weapon_reload(){
    document.getElementById("teams").innerHTML=""
unload()
developer_mode = 1
for (i = 0; i < weapon.length; i++){
    var vare = Object.keys(weapon[i])
    var a = weapon[i]
    var text = ""
    var ah = ""
    for (let x of vare) {
        if(x != "ability_detail"){
        text += x + ": " + decodeURIComponent(a[x]) + "<br>";
        ah += a[x]+" "
        }
      }
      dev_weapon_info(weapon[i].image,text,ah)
}
}

function dev(){
        dev_menu()
        for (i = 0; i < dev_tool.length; i++){
            var parent = document.getElementById("developer_tools")
            var tool = dev_tool[i]
            var click = document.createElement("a")
            var container = document.createElement("div")
            var title = document.createElement("p")
            var icon = document.createElement("i")
            title.innerText=tool
            title.classList.add("roboto-mono")
            icon.classList.add("material-icons")
            icon.classList.add("w3-quarter")
            icon.classList.add("mat_icons")
            icon.innerText = "code"
            click.onclick = new Function("event", dev_tool[i])
            click.href="javascript:void(0)"
            container.classList.add("navi_button_dev")
            container.appendChild(icon)
            container.appendChild(title)
            click.appendChild(container)
            parent.appendChild(click)
        }
}
function dev_check(){
    if(developer_mode == 10){
    alert("Developer tools enable")
    }else if(closes == 1){
        alert("Developer tools disable")
        closes = 0
    }

}
function dev_close(){
    var parent = document.getElementById("developer_tools")
    developer_mode = 0
    closes = 1
    parent.remove()
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

function dev_menu(){
    var main = document.getElementById("main")
    var navi_tool = document.createElement("div")
    var navi_butt = document.createElement("div")
    var title = document.createElement("p")
    var icon = document.createElement("i")
    navi_butt.classList.add("navi_text")
    navi_tool.id="developer_tools"
    navi_tool.classList.add("navi_right")
    navi_tool.classList.add("dark-1")
    title.innerText="Dev Tools"
    title.style.textAlign = "left"
    title.style.marginTop = "10px"
    title.classList.add("roboto-mono")
    icon.classList.add("material-icons")
    icon.classList.add("w3-quarter")
    icon.classList.add("mat_icons")
    icon.innerText = "code"
    navi_butt.appendChild(icon)
    navi_butt.appendChild(title)
    navi_tool.appendChild(navi_butt)
    main.appendChild(navi_tool)
  }
function dev_info(image,text,full_image,id){
    var parent = document.getElementById("character")
    var container = document.createElement("div")
    var container_img = document.createElement("div")
    var container_detail = document.createElement("div")
    var container_full_image = document.createElement("div")
    var img = document.createElement("img")
    var img_full = document.createElement("img")
    img.src=image
    img_full.src=full_image
    container_detail.innerHTML = text
    container.classList.add("dev_cha_info")
    container_img.appendChild(img)
    container_full_image.appendChild(img_full)
    container_full_image.classList.add("img")
    container_img.classList.add("img")
    container_detail.classList.add("detail")
    container_detail.classList.add("roboto-mono")
    container.appendChild(container_img)
    container.appendChild(container_full_image)
    container.appendChild(container_detail)
    container.id = id
    parent.appendChild(container)

}

function dev_weapon_info(image,text,id){
    var parent = document.getElementById("character")
    var container = document.createElement("div")
    var container_img = document.createElement("div")
    var container_detail = document.createElement("div")
    var img = document.createElement("img")
    img.src=image
    container_detail.innerHTML = text
    container.classList.add("dev_cha_info")
    container_img.appendChild(img)
    container_img.classList.add("img")
    container_detail.classList.add("detail")
    container_detail.classList.add("roboto-mono")
    container.appendChild(container_img)
    container.appendChild(container_detail)
    container.id = id
    parent.appendChild(container)

}

function filter(type,container,filter_tag){
    var parent = document.getElementById(container)
    var child = parent.getElementsByTagName(filter_tag)
    
    if(type == "all"){type = ""}
    for (i = 0; i < child.length; i++){
        if(child[i].id.includes(type)){
            console.log(child[i])
            child[i].classList.remove("hidea")
            
        }else{
            child[i].classList.add("hidea")
        }
        
    }
}
function close_filter(){
    var filter = document.getElementById("filter")
    var filterbtn = document.getElementById("filter_expand_btn")
    var elem = document.querySelector('.filter');
    var style = getComputedStyle(elem);
    if(filter.style.height == "205px"){
        filter.style.height = ""; 
        filterbtn.style.backgroundColor = "";
        filter.style.backgroundColor = ""
    }
    else if(filter.style.height == "165px"){
        filter.style.height = ""; 
        filterbtn.style.backgroundColor = "";
        filter.style.backgroundColor = ""
    }
}
function extanded_filter(){
    var filter = document.getElementById("filter")
    var filterbtn = document.getElementById("filter_expand_btn")
    var elem = document.querySelector('.filter');
    var style = getComputedStyle(elem);
    if(filter.style.height == "205px"){
        filter.style.height = ""; 
        filterbtn.style.backgroundColor = "";
        filter.style.backgroundColor = ""
    }
    else if(filter.style.height == "165px"){
        filter.style.height = ""; 
        filterbtn.style.backgroundColor = "";
        filter.style.backgroundColor = ""
    }
    else if(style.height == "60px"){
        filter.style.height = "205px";
        filterbtn.style.backgroundColor = "#707070";
        filter.style.backgroundColor = "#232323"
    }
    else if(style.height == "44px"){
        filter.style.height = "165px";
        filterbtn.style.backgroundColor = "#707070";
        filter.style.backgroundColor = "#232323"
    }
}
function extand_filter(){
    var filter = document.getElementById("filter")
    var filterbtn = document.getElementById("filter_expand_btn")
    var elem = document.querySelector('.filter');
    var style = getComputedStyle(elem);
    if(style.height == "60px"){
        filter.style.height = "205px";
        filterbtn.style.backgroundColor = "#707070";
        filter.style.backgroundColor = "#232323"
    }
    else if(style.height == "44px"){
        filter.style.height = "165px";
        filterbtn.style.backgroundColor = "#707070";
        filter.style.backgroundColor = "#232323"
    }
}
function search(id,filter_id){
    var input = document.getElementById(id)
    var value = input.value.toUpperCase()
    var parent = document.getElementById(filter_id)
    var list = parent.getElementsByTagName("a")
    var txtValue
    for (i = 0; i < list.length; i++) {
        txtValue = list[i].id;
        if (txtValue.toUpperCase().indexOf(value) > -1) {
          list[i].classList.remove("hidea")
        } else {
            list[i].classList.add("hidea")
        }
      }
}
function select_team(character){
var character_parent = document.getElementsByClassName(character)
var child_container = character_parent[0].getElementsByClassName("character_img")
var img_container = child_container[0].getElementsByClassName("selected")
if(img_container[0].style.opacity == "1"){
    img_container[0].style.opacity = "0"
}else{
    img_container[0].style.opacity = "1"
    
}
save_character(character)
}
function load_selected_team(character){
    var character_parent = document.getElementsByClassName(character)
    var child_container = character_parent[0].getElementsByClassName("character_img")
    var img_container = child_container[0].getElementsByClassName("selected")
    img_container[0].style.opacity = "1"
    }
function teams_img(name,image,code,region,wepon,element,rare){
    var parent = document.getElementById("character")
    var character_img_container = document.createElement("div")
    var name_container = document.createElement("div")
    var img_container = document.createElement("div")
    var images = document.createElement("img")
    var names = document.createElement("p")
    var link = document.createElement("a")
    var selected_container = document.createElement("div")
    var selected = document.createElement("img")
    var without_space = name.replaceAll(" ","_")
    selected.src="/img/character/head/selected.png"
    link.href = "javascript:void(0)"
    link.onclick = new Function("event", "select_team('"+without_space+"')")
    names.innerText = name
    images.src = image
    name_container.classList.add("name")
    img_container.classList.add("img")
    selected_container.classList.add("selected")
    name_container.appendChild(names)
    selected_container.appendChild(selected)
    img_container.appendChild(images)
    character_img_container.appendChild(img_container)
    character_img_container.appendChild(selected_container)
    character_img_container.appendChild(name_container)
    character_img_container.classList.add("character_img")
    link.id = name + " " + region + " " + wepon +" "+element+" "+rare+"☆ "+code+" "+without_space
    link.classList.add(without_space)
    link.appendChild(character_img_container)
    parent.appendChild(link)
}
function teams_weapon_img(name,image,code,region,wepon,rare){
    var parent = document.getElementById("character")
    var character_img_container = document.createElement("div")
    var name_container = document.createElement("div")
    var img_container = document.createElement("div")
    var images = document.createElement("img")
    var names = document.createElement("p")
    var link = document.createElement("a")
    var selected_container = document.createElement("div")
    var selected = document.createElement("img")
    name = decodeURIComponent(name)
    var without_space = name.replaceAll(" ","_")
    selected.src="/img/character/head/selected.png"
    link.href = "javascript:void(0)"
    link.onclick = new Function("event", "select_weapon('"+code+"')")
    names.innerText = name
    images.src = image
    name_container.classList.add("name")
    img_container.classList.add("img")
    selected_container.classList.add("selected")
    name_container.appendChild(names)
    selected_container.appendChild(selected)
    img_container.appendChild(images)
    character_img_container.appendChild(img_container)
    character_img_container.appendChild(selected_container)
    character_img_container.appendChild(name_container)
    character_img_container.classList.add("character_img")
    link.id = name + " " + region + " " + wepon +" "+rare+"☆ "+code+" "+without_space
    link.classList.add(code)
    link.appendChild(character_img_container)
    
    parent.appendChild(link)
}
function teams_selector(){
    var main = document.getElementById("main")
    var selection_container = document.getElementById("add_container")
    var btn = document.getElementById("team_switch")
    var teams_container = document.getElementById("teams")
    var box = document.querySelector(".teams")
    var box_style = getComputedStyle(box)
    if(main.style.backgroundColor == "rgb(112, 112, 112)"){
        main.style.backgroundColor = ""
        selection_container.innerHTML='<i class="material-icons-outlined"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">add_circle_outline</i>Add items'
        reload()
        btn.classList.add("hidea")
        close_filter()
        teams()
        document.getElementById("characters").innerText = "Character List"
    }else{
    main.style.backgroundColor = "#707070"
    selection_container.innerHTML='<i class="material-icons-outlined"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">check_circle_outline</i>Close'
    unload(1)
    teams_list = 0
    btn.classList.remove("hidea")
    team_expand(1)
    extand_filter()
    character_list_team()
    load_character_save()
    
    
    document.getElementById("characters").innerText = "Character List"
    }
    
}
function character_list_team(){
    teams_list = 0
    for (i = 0; i < character.length; i++){
        if(character[i].element_2 != null){
            var ele = character[i].element +" " + character[i].element_2+" "+character[i].element_3
            var traveler_image = getCookie("timage")
            if(traveler_image == "Aether"){
                traveler_image = character[i].image_male
            }else if(traveler_image == "Lumine"){
                traveler_image = character[i].image_female
            }else{
                traveler_image = character[i].image
            }
            console.log(traveler_image)
            teams_img(character[i].name,traveler_image,character[i].hex,character[i].region,character[i].weapon,ele,character[i].rarity)
        }else{
            teams_img(character[i].name,character[i].image,character[i].hex,character[i].region,character[i].weapon,character[i].element,character[i].rarity)
        }
    }
}
function weapon_list_team(){
    teams_list = 1
    for (i = 0; i < weapon.length; i++){
        if(weapon[i].ignore != "1"){
            teams_weapon_img(weapon[i].name,weapon[i].image,weapon[i].hex,weapon[i].region,weapon[i].weapon,weapon[i].rarity)
        }
        
    }
}
function team_switch(){
    var btn = document.getElementById("team_switch")
    if(teams_list == 0){
        teams_list = 1
        btn.innerHTML='<img src="img/icons/character.png">'
        btn.title = "Select Character"
        unload()
        weapon_list_team()
        load_weapon_save()
        document.getElementById("characters").innerText = "Weapon List"
    }else if(teams_list == 1){
        teams_list = 0
        
        btn.innerHTML='<img src="img/icons/weapon.png">'
        btn.title = "Select Weapon"
        unload()
        character_list_team()
        load_character_save()
        document.getElementById("characters").innerText = "Character List"
    }
}
function save_character(save_character){
    var last_save = getCookie("character")
    for (i = 0; i < character.length; i++){
        if(save_character.replace("_"," ") == character[i].name){
            if(last_save == null){last_save = ""}
            if(last_save.search(character[i].hex) == -1){
                document.cookie = "character="+last_save + "&" + character[i].hex
            }else{
                last_save = last_save.replace("&"+character[i].hex,"")
                document.cookie = "character="+last_save
            }
            
        }
    }
}

function searchall(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

function load_character_save(){
    var last_save = getCookie("character")
    for (i = 0; i < character.length; i++){
            if(last_save == null){last_save = ""}
            if(last_save.search(character[i].hex) != -1){
                load_selected_team(character[i].name.replace(" ","_"))
            }
    }
}


function select_weapon(code){
    var weapon_parent = document.getElementsByClassName(code)
    var child_container = weapon_parent[0].getElementsByClassName("character_img")
    var img_container = child_container[0].getElementsByClassName("selected")
    if(img_container[0].style.opacity == "1"){
        img_container[0].style.opacity = "0"
    }else{
        img_container[0].style.opacity = "1"
        
    }
    save_weapon(code)
    }
function load_weapon_save(){
        var last_save = getCookie("weapon")
        for (i = 0; i < weapon.length; i++){
                if(last_save == null){last_save = ""}
                if(last_save.search(weapon[i].hex) != -1){
                    load_selected_team(weapon[i].hex)
                }
        }
    }
function save_weapon(code){
        var last_save = getCookie("weapon")
        for (i = 0; i < weapon.length; i++){
            if(code == weapon[i].hex){
                if(last_save == null){last_save = ""}
                if(last_save.search(weapon[i].hex) == -1){
                    document.cookie = "weapon="+last_save + "&" + weapon[i].hex
                }else{
                    last_save = last_save.replace("&"+weapon[i].hex,"")
                    document.cookie = "weapon="+last_save
                }
                
            }
        }
    }

function teams(){
    var team = document.getElementById("teams")
    var day_title = document.createElement("h2")
    var cha_cookie = getCookie("character")
    var wea_cookie = getCookie("weapon")
    var cookie_empty = 0
    var box = document.querySelector(".teams")
    var box_style = getComputedStyle(box)
    team.style.height = "0px"
    export_open = 0
    import_open = 0
    team.innerHTML = ""
    day_title.classList.add("dark-1")
    day_title.style.margin = "0px"
    day_title.innerText = capitalize(today_full)
    team.appendChild(day_title)

    if(cha_cookie == null || cha_cookie === ""){
        cookie_empty = cookie_empty + 1
    }
    if(wea_cookie == null || wea_cookie === ""){
        cookie_empty = cookie_empty + 1
    }

    if(cookie_empty == 2){
        var none = document.createElement("p")
        none.innerText = "No items was selected, please select it from side menu."
        team.appendChild(none)
        
    }else{
        var last_save = getCookie("character")
        for (i = 0; i < character.length; i++){
            if(last_save == null){last_save = ""}
            if(last_save.search(character[i].hex) != -1){
            if(character[i].talent == today){
                teams_time_img(character[i].image,character[i].name,character[i].hex,"teams","/characters/"+character[i].name.replace(" ","_")+".html")
            }else if(today == "sunday"){
                teams_time_img(character[i].image,character[i].name,character[i].hex,"teams","/characters/"+character[i].name.replace(" ","_")+".html")
            }else if (character[i].name == "Traveler"){
                if(getCookie("timage") == "Aether"){
                    teams_time_img(character[i].image_male,character[i].name,character[i].hex,"teams","/characters/"+character[i].name.replace(" ","_")+".html")
                }else if(getCookie("timage") == "Lumine"){
                    teams_time_img(character[i].image_female,character[i].name,character[i].hex,"teams","/characters/"+character[i].name.replace(" ","_")+".html")
                }else{
                    teams_time_img(character[i].image,character[i].name,character[i].hex,"teams","/characters/"+character[i].name.replace(" ","_")+".html")
                }
            }
        }
        }
        var last_save = getCookie("weapon")
        for (i = 0; i < weapon.length; i++){
            if(last_save == null){last_save = ""}
            if(last_save.search(weapon[i].hex) != -1){
            if(weapon[i].talent == today){
                teams_time_img(weapon[i].image,weapon[i].name,weapon[i].hex,"teams","/weapon.html?wea=")
            }else if(today == "sunday"){
                teams_time_img(weapon[i].image,weapon[i].name,weapon[i].hex,"teams","/weapon.html?wea=")
            }
        }
    }
    }
    if(cookie_empty != 2) check_blank()
    var box = document.querySelector(".teams")
    var box_style = getComputedStyle(box)
    team.style.height = ""
    var current =  box_style.height
    team.style.height = "0px"
    setTimeout(() => {
        team.style.height = current
        setTimeout(() => {
            team.style.height = ""
        }, 200);
    }, 200);
}

function teams_time_img(image_file,name,hex,container,redir){
    var parent = document.getElementById(container)
    var character_img_container = document.createElement("div")
    var name_container = document.createElement("div")
    var img_container = document.createElement("div")
    var images = document.createElement("img")
    var names = document.createElement("p")
    var link = document.createElement("a")
    link.href = redir
    names.innerText = decodeURIComponent(name)
    images.src = image_file
    name_container.classList.add("name")
    img_container.classList.add("img")
    name_container.appendChild(names)
    img_container.appendChild(images)
    character_img_container.appendChild(img_container)
    character_img_container.appendChild(name_container)
    character_img_container.classList.add("character_img")
    link.id = name + " " + hex
    link.appendChild(character_img_container)
    parent.appendChild(link)
}

function reset(){
    var menu = document.getElementById("team_btn")
    menu.innerHTML='<a><div class="navi_text">Are you sure ?</div></a><a><div class="navi_teams_clear" onclick="reset_yes()">Yes</div></a><a><div class="navi_teams_cancel" onclick="reset_no()">no</div></a>'
}

function reset_yes(){
    var menu = document.getElementById("team_btn")
    menu.innerHTML='<a href="#teams"><div class="navi_button"><img src="img/icons/teams.png" style="width: 35px;margin-left:8px;margin-right:15px">Teams</div></a><a href="javascript:void(0)" onclick="teams_selector()"><div class="navi_button" id="add_container"><i class="material-icons-outlined"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">add_circle_outline</i>Add items</div></a><a href="javascript:void(0)" onclick="team_expand()"><div class="navi_button" id="expand"><i class="material-icons-outlined rotate_ani"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">expand_circle_down</i>Expand</div></a><a href="javascript:void(0)" onclick="export_teams()"><div class="navi_button"><i class="material-icons"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">file_upload</i>Export</div></a><a href="javascript:void(0)" onclick="import_teams()"><div class="navi_button"><i class="material-icons"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">download</i>Import</div></a><a href="javascript:void(0)" onclick="reset()"><div class="navi_button"><i class="material-icons-outlined"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">clear</i>Clear</div></a>'
    document.cookie = "character="
    document.cookie = "weapon="
    teams()
}

function reset_no(){
    var menu = document.getElementById("team_btn")
    menu.innerHTML='<a href="#teams"><div class="navi_button"><img src="img/icons/teams.png" style="width: 35px;margin-left:8px;margin-right:15px">Teams</div></a><a href="javascript:void(0)" onclick="teams_selector()"><div class="navi_button" id="add_container"><i class="material-icons-outlined"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">add_circle_outline</i>Add items</div></a><a href="javascript:void(0)" onclick="team_expand()"><div class="navi_button" id="expand"><i class="material-icons-outlined rotate_ani"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">expand_circle_down</i>Expand</div></a><a href="javascript:void(0)" onclick="export_teams()"><div class="navi_button"><i class="material-icons"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">file_upload</i>Export</div></a><a href="javascript:void(0)" onclick="import_teams()"><div class="navi_button"><i class="material-icons"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">download</i>Import</div></a><a href="javascript:void(0)" onclick="reset()"><div class="navi_button"><i class="material-icons-outlined"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">clear</i>Clear</div></a>'
    teams()
}

function check_blank(){
    var parent = document.getElementById("teams")
    var child = parent.getElementsByTagName("div")
    if(child.length == 0){
        var none = document.createElement("p")
        none.innerHTML="No domain is avalible for selected items for today."
        parent.appendChild(none)
    }
}
var starting_height

function team_expand(close=0){
    var teams_container = document.getElementById("teams")
    var days = ["monday","tuesday","wednesday","sunday"]
    var btn = document.getElementById("expand")
    var monday = document.createElement("div")
    var tuesday = document.createElement("div")
    var wednesday = document.createElement("div")
    var sunday = document.createElement("div")
    var day_monday = document.createElement("h2")    
    var day_tuesday = document.createElement("h2")
    var day_wednesday = document.createElement("h2")
    var day_sunday = document.createElement("h2")
    var cha_cookie = getCookie("character")
    var wea_cookie = getCookie("weapon")
    var box = document.querySelector(".teams")
    var box_style = getComputedStyle(box)
    var cha_empty, wea_empty
    export_open = 0
    import_open = 0
    
    if(cha_cookie == null || cha_cookie == "") cha_empty = 1
    if(wea_cookie == null || wea_cookie == "") wea_empty=1
    
    if(btn.getElementsByTagName("i")[0].style.transform == "rotate(180deg)" && close == 0){
        teams_container.style.height = box_style.height
        setTimeout(function(){
            teams_container.style.height = "0px"
            setTimeout(function(){
            
            teams_container.innerHTML = ""
            teams_container.style.height = ""
            teams()
            btn.innerHTML='<i class="material-icons-outlined rotate_ani"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">expand_circle_down</i>Expand'
        },200)
        },200)
    }else if(close == 1){
        teams_container.style.height = box_style.height
        
        setTimeout(function(){
            teams_container.style.height = "0px"
            setTimeout(function(){
            
            teams_container.innerHTML = ""
            teams_container.style.height = ""
            btn.innerHTML='<i class="material-icons-outlined rotate_ani"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;">expand_circle_down</i>Expand'
        },200)
        },200)
    }else{
        btn.innerHTML='<i class="material-icons-outlined rotate_ani"style="font-size: 24px;margin-left:10px;margin-right:15px;vertical-align: bottom;Transform: rotate(180deg)">expand_circle_down</i>Close'
        starting_height = box_style.height
        teams_container.style.height = starting_height
        setTimeout(() => {
            teams_container.style.height = "0px"
        }, 1);
    setTimeout(() => {
        day_monday.classList.add("dark-1")    
    day_tuesday.classList.add("dark-1")    
    day_wednesday.classList.add("dark-1")    
    day_sunday.classList.add("dark-1")    

    day_monday.style.margin = "0px"    
    day_tuesday.style.margin = "0px"
    day_wednesday.style.margin = "0px"
    day_sunday.style.margin = "0px"  

    day_monday.innerText = "Monday / Thursday"
    day_tuesday.innerText = "Tuesday / Friday"
    day_wednesday.innerText = "Wednesday / Saturday"
    day_sunday.innerText = "Sunday"    
    teams_container.innerHTML=""

    monday.id="monday"
    tuesday.id="tuesday"
    wednesday.id="wednesday"
    sunday.id="sunday"    

    monday.appendChild(day_monday)    
    tuesday.appendChild(day_tuesday)        
    wednesday.appendChild(day_wednesday)    
    sunday.appendChild(day_sunday)        

    teams_container.appendChild(monday)
    teams_container.appendChild(tuesday)
    teams_container.appendChild(wednesday)
    teams_container.appendChild(sunday)
    var character_image 
    if(cha_empty != 1){
    for (i = 0; i < character.length; i++){
        if(cha_cookie.search(character[i].hex) >= 1){
            if(character[i].name == "Traveler"){
                if(getCookie("timage") == "Aether"){
                    character_image = character[i].image_male
                }else if(getCookie("timage") == "Lumine"){
                    character_image = character[i].image_female
                }else{
                    character_image = character[i].image
                }
                for (c = 0; c < 4; c++){
                    teams_time_img(character_image,character[i].name,character[i].hex,teams_day[c],"/characters/"+character[i].name+".html")
                }
            }else{
            if(character[i].talent == "monday"){
                teams_time_img(character[i].image,character[i].name,character[i].hex,"monday","/characters/"+character[i].name+".html")
            }
            if(character[i].talent == "tuesday"){
                teams_time_img(character[i].image,character[i].name,character[i].hex,"tuesday","/characters/"+character[i].name+".html")
            }
            if(character[i].talent == "wednesday"){
                teams_time_img(character[i].image,character[i].name,character[i].hex,"wednesday","/characters/"+character[i].name+".html") 
            }
            teams_time_img(character[i].image,character[i].name,character[i].hex,"sunday","/characters/"+character[i].name+".html")
        }
        }
    }
    }
    if(wea_empty != 1){
    for (i = 0; i < weapon.length; i++){
        if(wea_cookie.search(weapon[i].hex) >= 1){
            if(weapon[i].talent == "monday"){
                teams_time_img(weapon[i].image,weapon[i].name,weapon[i].hex,"monday","/weapon.html?wea=")
            }
            if(weapon[i].talent == "thursday"){
                teams_time_img(weapon[i].image,weapon[i].name,weapon[i].hex,"thursday","/weapon.html?wea=")
            }
            if(weapon[i].talent == "wednesday"){
                teams_time_img(weapon[i].image,weapon[i].name,weapon[i].hex,"wednesday","/weapon.html?wea=")
            }
            teams_time_img(weapon[i].image,weapon[i].name,weapon[i].hex,"sunday","/weapon.html?wea=")
        }
    }
    }
    for (i = 0; i < days.length; i++){
        var a = document.getElementById(days[i])
        var child = a.getElementsByTagName("div")
        if(child.length == 0){
            var none = document.createElement("p")
            none.innerHTML="No domain is avalible for selected items for this day."
            a.appendChild(none)
        }
    }
    }, 200);
    setTimeout(() => {
        
    
    teams_container.style.height = ""
    var ending_height = box_style.height
    
    teams_container.style.height = "0px"
    setTimeout(function(){
        teams_container.style.height = ending_height; 
        setTimeout(() => {
            teams_container.style.height=""
        }, 200);
    },1)
}, 400);
    }

}

function import_teams(){
    var teams_container = document.getElementById("teams")
    var box = document.querySelector(".teams")
    var box_style = getComputedStyle(box)
    var link = window.location.href
    if(link.includes("import") == false){
        link = ""
    }
    teams_container.style.height = box_style.height
    if(import_open == 0){
        import_open = 1
        export_open = 0
        setTimeout(function(){
            teams_container.style.height = "0px"
            setTimeout(function(){
            teams_container.innerHTML = ""
            teams_container.style.height = ""
            import_teams_container(link)
            import_teams_preview()
            var ending_height = box_style.height
            teams_container.style.height = "0px"
            setTimeout(function(){teams_container.style.height = ending_height;
            setTimeout(function(){teams_container.style.height = ""
        },200)
        },200)
        },200)
        },200)
    }else{
        import_open = 0
        setTimeout(function(){
            teams_container.style.height = "0px"
    
            setTimeout(function(){
            teams_container.innerHTML = ""
            teams_container.style.height = ""
            teams()
        },200)
        },200)
    }

}

function import_teams_preview(){
    var input = document.getElementById("import")
    var link = input.value
    var title = document.getElementById("team_name")
    document.getElementById("importing").innerHTML = ""
    document.getElementById("end_support").style.display = "none"
    if(link.includes("import.html") == true){
        //gndatabase import
        var remove = link.slice(link.search("gndatabase.ml"),link.length)
        var strip = link.slice(link.search("import.html")+12,link.length)
        var split_in = searchall(";",strip)
        var cha_in = strip.slice(split_in[2]+4,strip.search("wea"))
        var wea_in = strip.slice(strip.search("wea")+3,strip.length)
        var namu = strip.slice(strip.search("name=")+5,split_in[2])
        document.getElementById("end_support").style.display = "block"
        input.value = "https://"+remove
        title.innerText = "Team name: "+decodeURI(namu)
        for (i = 0; i < character.length; i++){
            if(cha_in == null) cha_in = ""
            if(cha_in.search(character[i].gncode) != -1){
                export_img(character[i].image,character[i].name,"importing")}
        }
        for (i = 0; i < weapon.length; i++){
            if(wea_in == null) wea_in = ""
            if(wea_in.search(weapon[i].gncode) != -1){
                export_img(weapon[i].image,weapon[i].name,"importing")}
        }
        

    }else if(link.includes("?import") == true){
        //gimpact import
        var strip = link.slice(link.search("import;"),link.length)
        var split_in = searchall(";",strip)
        var cha_in = strip.slice(split_in[0]+4,split_in[1])
        var wea_in = strip.slice(split_in[1]+4,split_in[2])
        var namu = strip.slice(strip.search("name=")+5,strip.length)
        title.innerText = "Team name: "+decodeURI(namu)
        for (i = 0; i < character.length; i++){
            if(cha_in == null) cha_in = ""
            if(cha_in.search(character[i].hex) != -1){
                export_img(character[i].image,character[i].name,"importing")}
        }
        for (i = 0; i < weapon.length; i++){
            if(wea_in == null) wea_in = ""
            if(wea_in.search(weapon[i].hex) != -1){
                export_img(weapon[i].image,weapon[i].name,"importing")}
        }

    }

}

function parse_import_teams(remove=0){
    var check_remove = document.getElementById("switch-remove-teams")
    var link = document.getElementById("import").value
    if(check_remove.checked == true && remove == 0){
        document.getElementById("delete").style.height = "100px"
    }else if(check_remove.checked == true && remove == 1){
        document.cookie = "character="
        gdocument.cookie = "weapon="
    }else{
        if(link.includes("import.html") == true){
            //gndatabase import
            var remove = link.slice(link.search("gndatabase.ml"),link.length)
            var strip = link.slice(link.search("import.html")+12,link.length)
            var split_in = searchall(";",strip)
            var cha_in = strip.slice(split_in[2]+4,strip.search("wea"))
            var wea_in = strip.slice(strip.search("wea")+3,strip.length)
            for (i = 0; i < character.length; i++){
                var cha_cookie = getCookie("character")
                if(cha_in == null) cha_in = ""
                if(cha_cookie == null) cha_cookie = ""
                if(cha_in.search(character[i].gncode) != -1){
                    if(cha_cookie.includes(character[i].hex) == false){
                        document.cookie = "character="+cha_cookie +"&"+character[i].hex
                    }
                }
            }
            for (i = 0; i < weapon.length; i++){
                var wea_cookie = getCookie("weapon")
                if(wea_in == null) wea_in = ""
                if(wea_cookie == null) wea_cookie = ""
                if(wea_in.search(weapon[i].gncode) != -1){
                    if(wea_cookie.includes(weapon[i].hex) == false){
                        document.cookie = "weapon="+wea_cookie+"&"+weapon[i].hex
                    }
                }
            }
        }else if(link.includes("?import") == true){
            //gimpact import
            var strip = link.slice(link.search("import;"),link.length)
            var split_in = searchall(";",strip)
            var cha_in = strip.slice(split_in[0]+4,split_in[1])
            var wea_in = strip.slice(split_in[1]+4,split_in[2])
            for (i = 0; i < character.length; i++){
                var cha_cookie = getCookie("character")
                if(cha_in == null) cha_in = ""
                if(cha_cookie == null) cha_cookie = ""
                if(cha_in.search(character[i].hex) != -1){
                    if(cha_cookie.includes(character[i].hex) == false){
                        document.cookie = "character="+cha_cookie +"&"+character[i].hex
                    }
                }
            }
            for (i = 0; i < weapon.length; i++){
                var wea_cookie = getCookie("weapon")
                if(wea_in == null) wea_in = ""
                if(wea_cookie == null) wea_cookie = ""
                if(wea_in.search(weapon[i].hex) != -1){
                    if(wea_cookie.includes(weapon[i].hex) == false){
                        document.cookie = "weapon="+wea_cookie+"&"+weapon[i].hex
                    }
                }
            }
        }
        alert_container("Import Success!")
        setTimeout(() => {
        import_teams()
        setTimeout(() => {
            window.location.href = "/"
        }, 500);
        }, 3700);
    }
    
}

function import_teams_container(link){
    var teams_container = document.getElementById("teams")
    var title = document.createElement("div")
    var title_text = document.createElement("h3")
    var main_container = document.createElement("div")
    var team_name = document.createElement("h3")
    var import_input_container = document.createElement("div")
    var import_input = document.createElement("input")
    var import_btn = document.createElement("a")
    var info_1 = document.createElement("p")
    var delete_container = document.createElement("div")
    var delete_title = document.createElement("h3")
    var delete_yes = document.createElement("a")
    var delete_no = document.createElement("a")
    var info_2 = document.createElement("h3")
    var options_container = document.createElement("div")
    var options_container_2 = document.createElement("div")
    var remove_text = document.createElement("p")
    var switch_label = document.createElement("label")
    var switch_input = document.createElement("input")
    var switch_span = document.createElement("span")
    var options_container_3 = document.createElement("div")
    var import_from_gn_btn = document.createElement("a")
    var info_3 = document.createElement("p")
    var import_preview = document.createElement("div")
    var upgrade_container = document.createElement("div")
    var upgrade = document.createElement("h4")
    var upgrade_why = document.createElement("p")

    //title
    title_text.innerText = "Import Teams"
    title.classList.add("title_middle")
    title.appendChild(title_text)

    //main container
        //team name
            team_name.innerText = "Team name: "
            team_name.id = "team_name"

        //import container
            //input
                import_input.type = "text"
                import_input.id="import"
                import_input.placeholder = "gimpact.ml?import..."
                import_input.classList.add("roboto-mono")
                import_input.classList.add("export-input")
                import_input.onkeyup = new Function("event", "import_teams_preview()")
                import_input.value = link
            //import button
                import_btn.href = "javascript:void(0)"
                import_btn.classList.add("import-button")
                import_btn.onclick = new Function("event", "parse_import_teams()")
                import_btn.innerText = "Import"
            
            import_input_container.appendChild(import_input)
            import_input_container.appendChild(import_btn)
            import_input_container.classList.add("export_container")

        //info 1
            info_1.innerText = "Paste the import link here, gndatabase export link are supported"

        //convert gndatabase to gimpact alert container
            //title
                upgrade.innerText = "We encourage you to convert gndatabase import link to gimpact"
            //why
                upgrade_why.innerHTML = "because we will not continue supporting gndatabase in the future <br> as last time we were making gndatabase, we use a much simple method of storing character but it cannot hold more than 99 items. In short our developer is a fucking idiot"
            upgrade_container.appendChild(upgrade)
            upgrade_container.appendChild(upgrade_why)
            upgrade_container.style.display = "none"
            upgrade_container.id="end_support"


        //delete
            //title
                delete_title.innerText = "Are you sure"
            //yes button
                delete_yes.href = "javascript:void(0)"
                delete_yes.onclick = new Function("event", "parse_import_teams('1')")
                delete_yes.id = "yes"
                delete_yes.innerText = "Yes"
            //no button
                delete_no.href = "javascript:void(0)"
                delete_no.onclick = new Function("event", "document.getElementById('delete').style.height = ''")
                delete_no.innerText = "No"
            delete_container.id = "delete"
            delete_container.classList.add("delete")
            delete_container.appendChild(delete_title)
            delete_container.appendChild(delete_yes)
            delete_container.appendChild(delete_no)
        
        //info 2
            info_2.innerText = "Options"
        
        //options
            //switch container
                //switch text
                    //switch label
                        //switch input
                            switch_input.type = "checkbox"
                            switch_input.id = "switch-remove-teams"
                        //switch span
                            switch_span.classList.add("slider")
                        switch_label.classList.add("switch")
                        switch_label.appendChild(switch_input)
                        switch_label.appendChild(switch_span)
                    remove_text.innerText = "Keep existing "
                    remove_text.appendChild(switch_label)
                    remove_text.appendChild(document.createTextNode(" Remove existing"))
                options_container_2.appendChild(remove_text)
            
            //import from gn container
                //import from gn button
                    import_from_gn_btn.href = "https:\\\\gndatabase.ml\\export_to_gimpact.html"
                    import_from_gn_btn.innerText = "Import from gndatabase"
                options_container_3.appendChild(import_from_gn_btn)
            options_container.appendChild(options_container_2)
            options_container.appendChild(options_container_3)
            options_container.classList.add("options")
        
        //info 3
            info_3.innerText="Items that will be imported"

        //import preview
            import_preview.id = "importing"

        main_container.appendChild(team_name)
        main_container.appendChild(import_input_container)
        main_container.appendChild(info_1)
        main_container.appendChild(upgrade_container)
        main_container.appendChild(delete_container)
        main_container.appendChild(info_2)
        main_container.appendChild(options_container)
        main_container.appendChild(info_3)
        main_container.appendChild(import_preview)
        main_container.classList.add("exports")
                        
    teams_container.appendChild(title)
    teams_container.appendChild(main_container)


}

function export_teams(){
    var teams_container = document.getElementById("teams")
    var box = document.querySelector(".teams")
    var box_style = getComputedStyle(box)
    var cha = getCookie("character")
    var wea = getCookie("weapon")
    teams_container.style.height = box_style.height
    if(export_open == 0){
        export_open = 1
        import_open = 0
        setTimeout(function(){
            teams_container.style.height = "0px"
            setTimeout(function(){
            teams_container.innerHTML = ""
            teams_container.style.height = ""
            export_container()
            for (i = 0; i < character.length; i++){
                if(cha == null){cha = ""}
                if(cha.search(character[i].hex) != -1){
                    export_img(character[i].image,character[i].name,"exporting")}
            }
            for (i = 0; i < weapon.length; i++){
                if(wea == null){wea = ""}
                if(wea.search(weapon[i].hex) != -1){
                    export_img(weapon[i].image,weapon[i].name,"exporting")}
            }
            link()
            var ending_height = box_style.height
            teams_container.style.height = "0px"
            setTimeout(function(){teams_container.style.height = ending_height;
            setTimeout(function(){teams_container.style.height = ""
        },200)
        },200)
        },200)
        },200)
    }else{
        export_open = 0
        setTimeout(function(){
            teams_container.style.height = "0px"
    
            setTimeout(function(){
            teams_container.innerHTML = ""
            teams_container.style.height = ""
            teams()
        },200)
        },200)
    }
    

    
}

function copy(container,buttons){
    var out = document.getElementById(container)
    var button = document.getElementById(buttons)
    out.select()
    out.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(out.value);
    button.innerText = "done"
    setTimeout(() => {
        button.innerText = "content_copy"
    }, 1500);
}

function link(){
    var cha = getCookie("character")
    var wea = getCookie("weapon")
    var name = document.getElementById("export_name")
    var out_name, share_export
    var output = document.getElementById("export")
    var switch_check = document.getElementById("switch-share-teams")
    var links = "gimpact.ml?"

    if(cha == "" || cha == null) cha = ""
    if(wea == "" || wea == null) wea = ""

    if(name.value == "" || name.value == null) out_name = "Team1"
    else out_name = name.value
    out_name = encodeURI(out_name)

    if(switch_check.checked == true) share_export = "share"
    else share_export = "import"
    links = links + share_export + ";cha" + cha + ";wea" + wea +";name=" +out_name
    output.value = links
}

function export_img(image_file,name,container){
    var parent = document.getElementById(container)
    var character_img_container = document.createElement("div")
    var name_container = document.createElement("div")
    var img_container = document.createElement("div")
    var images = document.createElement("img")
    var names = document.createElement("p")
    names.innerText = decodeURIComponent(name)
    images.src = image_file
    name_container.classList.add("name")
    img_container.classList.add("img")
    name_container.appendChild(names)
    img_container.appendChild(images)
    character_img_container.appendChild(img_container)
    character_img_container.appendChild(name_container)
    character_img_container.classList.add("character_img")
    parent.appendChild(character_img_container)
}

function export_container(){
    var teams_container = document.getElementById("teams")
    var main_container = document.createElement("div")
    var title = document.createElement("div")
    var title_text = document.createElement("h3")
    var export_container = document.createElement("div")
    var text_out = document.createElement("input")
    var copy_btn = document.createElement("a")
    var info_1 = document.createElement("p")
    var info_2_container = document.createElement("div")
    var info_2 = document.createElement("h3")
    var info_3 = document.createElement("p")
    var team_name = document.createElement("input")
    var switch_container = document.createElement("div")
    var switch_label = document.createElement("p")
    var toggle_label = document.createElement("label")
    var toggle_checkbox = document.createElement("input")
    var toggle_span = document.createElement("span")
    var info_4 = document.createElement("p")
    var export_preview = document.createElement("div")

    //Export teams title
    title_text.innerText="Export Teams"
    title.classList.add("title_middle")
    title.appendChild(title_text)

    //export continer
        //input
        text_out.readOnly = true
        text_out.value="Not generated"
        text_out.type = "text"
        text_out.id = "export"
        text_out.classList.add("roboto-mono")
        text_out.classList.add("export-input")  

        //copy button
        copy_btn.href="javascript:void(0)"
        copy_btn.onclick = new Function("event", "copy('export','copy_button')")
        copy_btn.id = "copy_button"
        copy_btn.classList.add("material-icons")
        copy_btn.classList.add("copy-button")
        copy_btn.innerText = "content_copy"
    
    export_container.classList.add("export_container")
    export_container.appendChild(text_out)
    export_container.appendChild(copy_btn)

    //info text
    info_1.innerText = "Paste this link on any devices you want to import, or sleect share teams below to just share your teams with anyone."

    //options title
    info_2.innerText = "Options"
    info_2_container.style.marginLeft = "5px"
    info_2_container.appendChild(info_2)

    //team name title
    info_3.innerText = "Team name (optional)"

    //team name input
    team_name.placeholder = "Team1"
    team_name.type = "text"
    team_name.id = "export_name"
    team_name.onkeyup = new Function("event", "link() ")
    team_name.onkeydown = new Function("event", "link() ")
    team_name.classList.add("export-input")

    //switch container
        //p
        switch_label.innerText = "Export "
            //switch
            toggle_span.classList.add("slider")
            toggle_checkbox.type="checkbox"
            toggle_checkbox.id = "switch-share-teams"
            toggle_checkbox.onclick = new Function("event", "link() ")
            toggle_label.classList.add("switch")
            toggle_label.appendChild(toggle_checkbox)
            toggle_label.appendChild(toggle_span)
        switch_label.appendChild(toggle_label)
        switch_label.appendChild(document.createTextNode(" Share teams"))
    switch_container.classList.add("share_switch")
    switch_container.appendChild(switch_label)

    //info 4
    info_4.innerText="Items that would be exported"

    //export preview container
    export_preview.id = "exporting"

    main_container.appendChild(export_container)
    main_container.appendChild(info_1)
    main_container.appendChild(info_2_container)
    main_container.appendChild(info_3)
    main_container.appendChild(team_name)
    main_container.appendChild(switch_container)
    main_container.appendChild(info_4)
    main_container.appendChild(export_preview)
    main_container.classList.add("exports")

    teams_container.appendChild(title) 
    teams_container.appendChild(main_container)
}

function searchall(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) return [];
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

function alert_container(text){
 var main_container = document.createElement("div")
 var close_btn = document.createElement("span")
 var text_node = document.createTextNode(text)

 close_btn.classList.add("closebtn")
 close_btn.onclick = new Function("event", "alert_remove()")
 close_btn.innerHTML = "&times;"

 main_container.classList.add("alert")
 main_container.classList.add("slide-in-top")
 main_container.id="alert"
 main_container.appendChild(close_btn)
 main_container.appendChild(text_node)
 document.getElementById("main").appendChild(main_container)
 setTimeout(() => {
     alert_remove()
 }, 4000);
}
function alert_remove(){
    var al = document.getElementById("alert")
    al.classList.add("slide-out-top")
    al.classList.remove("slide-in-top")
    setTimeout(() => {
        al.remove()
    }, 700);
}