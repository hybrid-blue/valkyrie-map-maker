import Valkyrie from './val-engine';
import element from './elms';

var val;

export default class Builder{
  constructor(options){
    this.root = document.querySelector(`${options.target}`);
    this.tileset;
    this.selected;
    this.removeAttr = [];
    this.loadedData = false;
  }

  buildElm(options){
    const dom = new DOMParser()
    let content = dom.parseFromString(options.content, "text/html").querySelector('body').querySelector('div');
    let elm = document.createElement('div');

    elm.setAttribute('id', options.id);
    elm.setAttribute('class', options.type)
    elm.style.width = options.size.width || 'auto';
    elm.style.height = options.size.height || 'auto';

    elm.appendChild(content)
    this.root.appendChild(elm)
  }

  renderWorkSpace(){

    this.buildElm(element.tools);

    this.buildElm(element.tiles);

    this.buildElm(element.attributes);

    this.buildElm(element.position);

    this.renderAttributeDialog();

    document.querySelector('#add-attribute').addEventListener('click', () => {
      document.querySelector('#maker-attribute').classList.remove('hidden');
    })

    document.querySelector('#remove-attribute').addEventListener('click', () => {
      document.querySelector('#maker-attribute-remove').classList.remove('hidden');
    })


    document.querySelector('#clear-all').addEventListener('click', () => {
      if(window.confirm("Are you sure you want to clear all the tiles?")){
        val.clearAll();
      }

    })

    document.querySelector('#flatten-all').addEventListener('click', () => {
      if(window.confirm('Are you sure you want to flatten the map')){
        val.levelZero();
      }
    })

    document.querySelector('#load-map').addEventListener('click', () => {

      console.log('Click Load')

      let loadInput = document.createElement('input');
      loadInput.setAttribute('type', 'file');
      document.body.appendChild(loadInput);
      loadInput.style.display = 'hidden';
      loadInput.click();

      loadInput.addEventListener('change', (e) => {
        console.log(loadInput.files[0]);
        if(loadInput.files[0].type === "application/json"){

          const reader = new FileReader();

          reader.onload = (
            function(i){
              return function(e){
                var settings = {}, data;
                var json = JSON.parse(window.atob(e.target.result.split(',')[1]));


                console.log(json.data)

                let settingElms = document.querySelector('#settings-button');
                let jsonSettings = document.createElement('div');

                let loadMapBtn = document.createElement('button');
                loadMapBtn.setAttribute('class', 'button button__full-width button__margin');
                loadMapBtn.setAttribute('id', 'load-data');
                loadMapBtn.innerHTML = "Create Map"

                jsonSettings.setAttribute('id', 'map-details');

                let listElm = document.createElement('ul');

                this.tileset = json.settings["tileset"];

                Object.keys(json.settings).forEach((item, i) => {

                  if(item === "name" || item === "tileSize" || item === "tilesX" || item === "tilesY" || item === "zHeight" || item === "tileset"){
                    let key = item;
                    let value = json.settings[item];

                    settings[key] = value;

                    // let listItem = document.createElement('li');
                    // listItem.innerHTML = `${key}: ${value}`;
                    // listElm.appendChild(listItem);
                  }

                })

                document.body.removeChild(loadInput);

                val.updateMap(settings, json.data);

                elmTiles.innerHTML = '';

                Object.keys(this.tileset).forEach(item => {

                  let labelElm = document.createElement('label');
                  let inputElm = document.createElement('input');

                  inputElm.setAttribute('type', 'radio');
                  inputElm.setAttribute('name', 'tiles');
                  inputElm.setAttribute('data-tile', item);

                  labelElm.appendChild(inputElm)

                  let imgElm = document.createElement('img');

                  imgElm.src = this.tileset[item]

                  labelElm.appendChild(imgElm)

                  elmTiles.appendChild(labelElm)

                })


                // settingElms.appendChild(listElm);
                // settingElms.appendChild(loadMapBtn);
                //
                // loadMapBtn.addEventListener('click', () => {
                //   initEditor(json)
                // })

              }
            }
          )()

          reader.readAsDataURL(loadInput.files[0])
        }else{
          window.alert('Only JSON files can be loaded')
        }
      })



    })

    document.querySelector('#save-map').addEventListener('click', () => {
      val.saveMap();
    })

    const elmTiles = document.querySelector('#tiles-list');

    console.log(this.tileset)

    Object.keys(this.tileset).forEach(item => {

      let labelElm = document.createElement('label');
      let inputElm = document.createElement('input');

      inputElm.setAttribute('type', 'radio');
      inputElm.setAttribute('name', 'tiles');
      inputElm.setAttribute('data-tile', item);

      labelElm.appendChild(inputElm)

      let imgElm = document.createElement('img');

      imgElm.src = this.tileset[item]

      labelElm.appendChild(imgElm)

      elmTiles.appendChild(labelElm)

    })

  }

  renderAttributeDialog(){

    // if(!document.querySelector('#maker-attribute')) this.buildElm(element.createAttribute);
    this.buildElm(element.createAttribute);
    this.buildElm(element.removeAttribute);

    var dialogAttrElm = document.querySelector('#maker-attribute');
    var dialogAttrRemoveElm = document.querySelector('#maker-attribute-remove');

    var closeBtn = dialogAttrElm.querySelector('[data-dialog="cancel"]');
    var createBtn = dialogAttrElm.querySelector('[data-dialog="create"]')
    var attrVal = document.querySelector('#attr-name')

    var removeCloseBtn = dialogAttrRemoveElm.querySelector('[data-dialog="cancel"]');
    var removeCreateBtn = dialogAttrRemoveElm.querySelector('[data-dialog="remove"]')

    closeBtn.addEventListener('click', () => {
      attrVal.value = null;
      document.querySelector('#maker-attribute').classList.add('hidden');
    })

    createBtn.addEventListener('click', () => {
      // val.setTileAttr(attrVal.value)

      var attrRemoveElm = document.querySelector('#maker-attribute-remove')
      var attrListRemove = attrRemoveElm.querySelectorAll('.attribute-list')[0];

      let attrLabelRemove = document.createElement('label');
      let attrSpanRemove = document.createElement('span');
      attrSpanRemove.innerHTML = attrVal.value;


      let attrList = document.querySelector('#attribute-list');
      let attrLabel = document.createElement('label');
      // attrLabel.setAttribute('id', `label-${attrVal.value}`)
      let attrSpan = document.createElement('span');
      attrSpan.innerHTML = attrVal.value;

      let attrInput = document.createElement('input');
      let removeAttrInput = document.createElement('input');

      attrInput.setAttribute('type', 'checkbox')
      attrInput.setAttribute('value', attrVal.value)
      attrInput.setAttribute('id', `attribute-${attrVal.value}`)
      attrInput.setAttribute('class', `tile-attribute`)


      removeAttrInput.setAttribute('type', 'checkbox')
      removeAttrInput.setAttribute('value', attrVal.value)
      removeAttrInput.setAttribute('id', `remove-attribute-${attrVal.value}`)
      removeAttrInput.setAttribute('class', `tile-attribute`)

      // if(tile.data.attr[item]) attrInput.checked = true;
      attrInput.checked = false;

      val.setAttr(attrVal.value)

      attrInput.addEventListener('click', (e) => {
        // console.log(e.target.value)
        // console.log(e.target.checked)
        val.setTileAttr(e.target.value, e.target.checked)
      })

      attrLabel.appendChild(attrSpan);
      attrLabel.appendChild(attrInput);
      attrList.appendChild(attrLabel);


      removeAttrInput.addEventListener('click', (e) => {
        // console.log(e.target.value)
        // console.log(e.target.checked)
        //

        if(e.target.checked){
          this.removeAttr.push(e.target.value);
        }else{
          this.removeAttr = this.removeAttr.filter(attr => attr !== e.target.value)
        }

        console.log(this.removeAttr)

      })

      attrLabelRemove.appendChild(attrSpanRemove);
      attrLabelRemove.appendChild(removeAttrInput);
      attrListRemove.appendChild(attrLabelRemove);

      document.querySelector('#maker-attribute').classList.add('hidden');
      attrVal.value = null;
    })

    removeCloseBtn.addEventListener('click', () => {
      document.querySelector('#maker-attribute-remove').classList.add('hidden');
    })

    removeCreateBtn.addEventListener('click', () => {
      this.removeAttr.forEach(item => {
        val.removeAttr(item);

        let parentElm = document.querySelector('#attribute-list');
        let targetElm = document.querySelector(`#attribute-${item}`).parentNode;

        let parentElmRemove = document.querySelector('#maker-attribute-remove').querySelector('.attribute-list');
        let targetElmRemove = document.querySelector(`#remove-attribute-${item}`).parentNode;

        parentElm.removeChild(targetElm)
        parentElmRemove.removeChild(targetElmRemove);
      });

      this.removeAttr = [];
      document.querySelector('#maker-attribute-remove').classList.add('hidden');
    })

  }

  init(){
    this.buildElm(element.dialog)

    const newMap = document.querySelector('#new-map');
    const loadMap = document.querySelector('#load-map');
    const createMap = document.querySelector('#create-map');
    const filesElm = document.querySelector('#loaded-tiles');
    const newMapSettings = document.querySelector('#new-map-settings');
    const buttonWrapper = document.querySelector('#settings-button');

    document.querySelector('#root').classList.add('center-content');

    newMap.addEventListener('click', () => {
      buttonWrapper.classList.add('hidden');
      newMapSettings.classList.remove('hidden');
    })

    const initEditor = (data = null) => {

      console.log('---------------------')
      console.log(this)

      let formElms = document.querySelector('#form-settings').elements;

      document.querySelector('#root').classList.remove('center-content');

      let dailogElm = document.querySelector('#maker-init')
      this.root.removeChild(dailogElm)

      if(data){
        this.tileset = data.settings['tileset'];
      }

      this.renderWorkSpace()

      let editorWindowElm = document.createElement('div');
      editorWindowElm.setAttribute('id', 'maker-editor');

      let editorWrapperElm = document.createElement('div');
      editorWrapperElm.setAttribute('id', 'maker-editor-wrapper');

      document.querySelector('#root').appendChild(editorWindowElm);
      document.querySelector('#maker-editor').appendChild(editorWrapperElm);

      if(data){

        val = new Valkyrie({
          root: data.settings['root'],
          tileset: data.settings['tileset'],
          mapName: data.settings['name'],
          tileSize: parseInt(data.settings['tileSize']),
          tilesX: parseInt(data.settings['tilesX']),
          tilesY: parseInt(data.settings['tilesY']),
          zHeight: parseInt(data.settings['zHeight'])
        })

        val.loadMap(data.data);

      }else{
        val = new Valkyrie({
          root: '#maker-editor-wrapper',
          tileset: this.tileset,
          mapName: formElms[0].value,
          tileSize: parseInt(formElms[1].value),
          tilesX: parseInt(formElms[2].value),
          tilesY: parseInt(formElms[3].value),
          zHeight: parseInt(formElms[4].value)
        })
      }



      val.onMouseMove((e, tile) => {
        document.querySelector('#counter').innerHTML = tile.tile
      })

      val.onClickLeft((e, tile) => {

        // if(document.querySelector('#add-attribute')){
          // document.querySelector('#add-attribute').classList.add('hidden');
        // }

        let tools = document.querySelectorAll('[name="tools"]');

        var selected;

        tools.forEach((tool) => {
          if(tool.checked){
            selected = tool.dataset.option;
          }
        });

        switch(selected){
          case 'select':
            val.holdTile(tile, e)

            const attr = document.querySelector('#attribute-list');
            // var addAttrBtn = document.querySelector('#add-attribute');
            // addAttrBtn.classList.remove('hidden')
            // const addAttrBtn = document.createElement('button');
            // addAttrBtn.setAttribute('class', 'button button__full-width button__small');
            // addAttrBtn.setAttribute('id', 'add-attribute');
            // addAttrBtn.innerHTML = 'Add Attribute';
            //
            // attr.appendChild(addAttrBtn)

            let attributes = document.querySelector('#attribute-content').querySelectorAll('.tile-attribute');

            // if(Object.keys(tile.data.attr).length > 0 && tile.data.attr.constructor === Object){
              attributes.forEach(item => {

                // let attrLabel = document.createElement('label');
                //
                // let attrSpan = document.createElement('span');
                // attrSpan.innerHTML = item;
                //
                // let attrInput = document.createElement('input');
                // attrInput.setAttribute('type', 'checkbox')
                // attrInput.setAttribute('value', item)

                // console.log(tile.data.attr[item.value])
                console.log(tile.data.attr)

                if(tile.data.attr[item.value]){
                  item.checked = true;
                }else{
                  item.checked = false;
                }

                // attrLabel.appendChild(attrSpan);
                // attrLabel.appendChild(attrInput);
                //
                // attr.appendChild(attrLabel)

              })
            // }

          break;
          case 'draw':
            let tiles = document.querySelectorAll('[name="tiles"]');
            var img;
            tiles.forEach(tile => {
              if(tile.checked){
                console.log(tile)
                img = tile.dataset.tile;
              }
            })
            val.editTile(img, tile, e)
          break;
          case 'clear':
            val.editTile(null, tile, e);
          break;
          case 'increase-z':
            val.tileLevel('increase', tile);
          break;
          case 'decrease-z':
            val.tileLevel('decrease', tile);
          break;
        }

      })

      val.draw();


      // setTimeout(() => {

        const setScrollBars = () => {

          const editorElm = document.querySelector('#maker-editor')
          const wrapperElm = document.querySelector('#maker-editor-wrapper')

          let canvasWidth = document.querySelectorAll('canvas')[0].offsetWidth;
          let canvasHeight = document.querySelectorAll('canvas')[0].offsetHeight;

          let makerTilesElm = document.querySelector('#maker-tiles').offsetWidth;
          let makerToolsElm = document.querySelector('#maker-tools').offsetWidth;


          editorElm.style.width = (window.innerWidth - (makerToolsElm + makerTilesElm));
          editorElm.style.left = makerToolsElm;

          wrapperElm.style.width = canvasWidth;
          wrapperElm.style.height = canvasHeight;
          wrapperElm.style.paddingRight = 60;
          wrapperElm.style.paddingBottom = 60;

          window.addEventListener('resize', () => {
            editorElm.style.width = (window.innerWidth - (makerToolsElm + makerTilesElm));
            editorElm.style.left = makerToolsElm;
          })

        }

        setScrollBars();


    }

    loadMap.addEventListener('click', () => {

      console.log('Load Map clicked')

      let loadInput = document.createElement('input');
      loadInput.setAttribute('type', 'file');
      loadInput.setAttribute('id', 'load');

      document.body.appendChild(loadInput);

      loadInput.style.display = "hidden";

      loadInput.click();

      var json;

      loadInput.addEventListener('change', (e) => {
        console.log(loadInput.files[0]);
        if(loadInput.files[0].type === "application/json"){

          const reader = new FileReader();

          reader.onload = (
            function(i){
              return function(e){
                json = JSON.parse(window.atob(e.target.result.split(',')[1]));


                console.log(json.settings)

                let settingElms = document.querySelector('#settings-button');
                let jsonSettings = document.createElement('div');

                let loadMapBtn = document.createElement('button');
                loadMapBtn.setAttribute('class', 'button button__full-width button__margin');
                loadMapBtn.setAttribute('id', 'load-data');
                loadMapBtn.innerHTML = "Create Map"

                jsonSettings.setAttribute('id', 'map-details');

                let listElm = document.createElement('ul');

                console.log(json.settings)

                Object.keys(json.settings).forEach((item, i) => {

                  if(item === "name" || item === "tileSize" || item === "tilesX" || item === "tilesY" || item === "zHeight"){
                    let key = item;
                    let value = json.settings[item];
                    let listItem = document.createElement('li');

                    listItem.innerHTML = `${key}: ${value}`;
                    listElm.appendChild(listItem);
                  }

                })

                settingElms.appendChild(listElm);
                settingElms.appendChild(loadMapBtn);

                loadMapBtn.addEventListener('click', () => {
                  initEditor(json)
                })

              }
            }
          )()

          reader.readAsDataURL(loadInput.files[0])
        }else{
          window.alert('Only JSON files can be loaded')
        }
      })




    })

    createMap.addEventListener('click', () => {
      initEditor();
    })

    filesElm.addEventListener('change', (e) => {

      var tilesObj = {};

      let fileElm = document.querySelector('#files');

      for(let file of e.target.files){

        const img = document.createElement('img');
        img.file = file;

        fileElm.appendChild(img)

        const reader = new FileReader();

        reader.onload = (
          function(i){
            return function(e){
              i.src = e.target.result;
              tilesObj[file.name.split('.')[0]] = e.target.result;
            }
          }
        )(img)

        reader.readAsDataURL(file)

      }

      this.tileset = tilesObj;

    })

  }

  start(){
    this.init();
  }

}
