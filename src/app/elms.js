var element = {};

element['dialog'] = {
  type: 'dialog',
  id: 'maker-init',
  size:{
    height: null,
    width: 400,
  },
  content: `
    <div id="maker-settings">
      <div class="elm-heading">
        <h1>Valkyrie Map Maker</h1>
      </div>
      <div class="elm-content">

        <div id="new-map-settings" class="hidden">
          <h2>New Map</h2>
          <div class="settings">

            <form id="form-settings">
              <label class="settings-label__inline">
                <span class="settings-label">Name</span>
                <input type="text" value="map"></input>
              </label>
              <label class="settings-label__inline">
                <span class="settings-label">Tile Size</span>
                <input type="number" value="120"></input>
                PX
              </label>
              <label class="settings-label__inline">
                <span class="settings-label">Tiles X</span>
                <input type="number" value="7"></input>
              </label>
              <label class="settings-label__inline">
                <span class="settings-label">Tiles Y</span>
                <input type="number" value="7"></input>
              </label>
              <label class="settings-label__inline">
                <span class="settings-label">Z Height</span>
                <input type="number" value="20"></input>
                PX
              </label>
              <div class="divider-line"></div>
              <label class="settings-label__inline">
                <span class="settings-label settings-label__block">Load Tiles</span>
                <input id="loaded-tiles" type="file" multiple></input>
              </label>
              <div id="files"></div>
            </form>



            <button id="create-map" class="button button__full-width button__margin">Create Map</button>
          </div>
        </div>

        <div id="settings-button">
          <button id="new-map" class="button button__full-width button__margin">New Map</button>
          <div class="divider-line"></div>
          <button id="load-map" class="button button__full-width button__margin">Load Map</button>
        </div>

      </div>
    </div>
  `
}


element['createAttribute'] = {
  type: 'dialog hidden',
  id: 'maker-attribute',
  size:{
    height: null,
    width: 300,
  },
  content: `
    <div class="attribute-wrapper">
      <div class="elm-heading">
        <h2>Add Attribute</h2>
      </div>
      <div class="elm-content">
        <div class="attribute-list"></div>
        <label>
          <span>Name:</span>
          <input type="text" id="attr-name"></input>
        </label>
        <div class="button-wrapper">
          <button class="button button__small button__small-width" data-dialog="create">Create</button>
          <button class="button button__small button__small-width" data-dialog="cancel">Cancel</button>
        </div>
      </div>
    </div>
  `
}

element['removeAttribute'] = {
  type: 'dialog hidden',
  id: 'maker-attribute-remove',
  size:{
    height: null,
    width: 300,
  },
  content: `
    <div class="attribute-wrapper">
      <div class="elm-heading">
        <h2>Remove Attribute</h2>
      </div>
      <div class="elm-content">
        <div class="attribute-list"></div>
        <div class="button-wrapper">
          <button class="button button__small button__small-width" data-dialog="remove">Remove</button>
          <button class="button button__small button__small-width" data-dialog="cancel">Cancel</button>
        </div>
      </div>
    </div>
  `
}

element['tools'] = {
  type: 'tools',
  id: 'maker-tools',
  size: {
    height: '100%',
    width: 60
  },
  content: `
    <div id="tools-content">
      <div id="tile-tools">
        <label>
          <input type="radio" name="tools" data-option="select"></input>
          <div class="tool-option"><i class="far fa-hand-paper fa-lg"></i></div>
        </label>
        <label>
          <input type="radio" name="tools" data-option="draw"></input>
          <div class="tool-option"><i class="fas fa-pencil-alt fa-lg"></i></div>
        </label>
        <label>
          <input type="radio" name="tools" data-option="clear"></input>
          <div class="tool-option"><i class="fas fa-eraser fa-lg"></i></div>
        </label>
        <label>
          <input type="radio" name="tools" data-option="increase-z"></input>
          <div class="tool-option"><i class="fas fa-level-up-alt fa-lg"></i></div>
        </label>
        <label>
          <input type="radio" name="tools" data-option="decrease-z"></input>
          <div class="tool-option"><i class="fas fa-level-down-alt fa-lg"></i></div>
        </label>
      </div>

      <div id="tile-options">
        <button id="clear-all"><i class="fas fa-trash-alt fa-lg"></i></button>
        <button id="flatten-all"><i class="far fa-square fa-lg"></i></button>
        <hr />
        <button id="load-map"><i class="fas fa-upload fa-lg"></i></button>
        <a id="save-map"><i class="fas fa-save fa-lg"></i></a>
      </div>

    </div>
  `
}


element['tiles'] = {
  type: 'tiles',
  id: 'maker-tiles',
  size: {
    height: '70%',
    width: 250
  },
  content: `

    <div id="tiles-content">
      <div class="elm-heading">
        <h3>Tiles</h3>
      </div>
      <div id="tiles-list"></div>
    </div>
  `
}

element['attributes'] = {
  type: 'attr',
  id: 'maker-attr',
  size: {
    height: '30%',
    width: 250
  },
  content: `
    <div id="attribute-content">
      <div class="elm-heading">
        <h3>Attribute</h3>
      </div>
      <div class="content-padding">
        <div id="attribute-list"></div>
        <div class="button-wrapper">
          <button class="button button__extra-small-width button__small" id="add-attribute">Add</button>
          <button class="button button__extra-small-width button__small" id="remove-attribute">Remove</button>
        </div>
      </div>
    </div>
  `
}

element['position'] = {
  type: 'position',
  id: 'tile-position',
  size: {
    height: 'auto',
    width: 'auto'
  },
  content: `
    <div id="position-content">
        <h3><span>Position</span><span id="counter"></span></h3>
    </div>
  `
}

export default element
