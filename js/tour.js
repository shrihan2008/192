AFRAME.registerComponent("tour", {
    schema: {
      state: { type: "string", default: "places-list" },
      selectedCard: { type: "string", default: "#card1" },
      zoomAspectRatio: { type: "number", default: 1 }
    },
    init: function() {
      this.placesContainer = this.el;
      this.cameraEl = document.querySelector("#camera");
      this.createCards();
    },
    update: function() {
      window.addEventListener("keydown", e => {
        if (e.key === "ArrowUp") {
          if (
            (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
            (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
          ) {
            this.data.zoomAspectRatio += 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
          }
        }
        if (e.key === "ArrowDown") {
          if (
            (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
            (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
          ) {
            this.data.zoomAspectRatio -= 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
          }
        }
      });
    },
    tick: function() {
      const { state } = this.el.getAttribute("tour");
  
      if (state === "view") {
        this.hideEl([this.placesContainer]);
        this.showView();
      }
    },
    hideEl: function(elList) {
      elList.map(el => {
        el.setAttribute("visible", false);
      });
    },
    showView: function() {
      const { selectedCard } = this.data;
  
      //Set the 360 degree image to the sky element.
      const skyEl = document.querySelector("#main-container");
  
      skyEl.setAttribute("material", {
        src: `../assets/${selectedCard}/place-1.jpeg`,
        color: "#fff"
      });
    },
    createCards: function() {
      
      const thumbNailsRef = [
        {
          id: "taj_mahal",
          title: "Taj Mahal",
          url: "../assets/taj_mahal/taj_mahal.png"
        },
        {
          id: "machu",
          title: "Machu Pichu",
          url: "../assets/machu/machu.jpg"
        },
  
        {
          id: "petra",
          title: "Petra",
          url: "../assets/petra/petra.jpg"
        },
        {
          id: "great",
          title: "Great Wall Of China",
          url: "../assets/great/great.jpg"
        },
        {
            id: "christ",
            title: "Christ",
            url: "../assets/christ/christ.jpeg"
          },
          {
            id: "Chichen_Itza",
            title: "Chichen Itza",
            url: "../assets/Chichen_Itza/Chichen_Itza.jpg"
          },
          {
            id: "colloseum",
            title: "Colloseum",
            url: "../assets/colloseum/colloseum.jpg"
          }
          
      ];
      let prevoiusXPosition = -70;
      for (var item of thumbNailsRef) {
        const posX = prevoiusXPosition + 17;
        const posY = 10;
        const posZ = -40;
        const position = { x: posX, y: posY, z: posZ };
        prevoiusXPosition = posX;
  
        // Border Element
        const borderEl = this.createBorder(position, item.id);
  
        // Thubnail Element
        const thumbNail = this.createThumbNail(item);
        borderEl.appendChild(thumbNail);
  
        // Title Text Element
        const titleEl = this.createTitleEl(position, item);
        borderEl.appendChild(titleEl);
  
        this.placesContainer.appendChild(borderEl);
      }
    },
    createBorder: function(position, id) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("id", id);
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("geometry", {
        primitive: "ring",
        radiusInner: 6,
        radiusOuter: 7
      });
      entityEl.setAttribute("position", position);
      entityEl.setAttribute("material", {
        color: "cyan",
        opacity: 1
      });
      entityEl.setAttribute("cursorevent", {});
      return entityEl;
    },
    createThumbNail: function(item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("geometry", {
        primitive: "circle",
        radius: 6
      });
      entityEl.setAttribute("material", { src: item.url });
      entityEl.setAttribute("cursorevent", {});
      return entityEl;
    },
    createTitleEl: function(position, item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("text", {
        font: "exo2bold",
        align: "center",
        width: 60,
        color: "cyan",
        value: item.title
      });
      const elPosition = position;
      elPosition.y = -20;
      entityEl.setAttribute("position", elPosition);
      entityEl.setAttribute("visible", true);
      return entityEl;
    }, 
    
  });
  