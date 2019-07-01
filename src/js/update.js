var update = (function() {

  // this associative array contains all the updates. add
  // a new entry if you need to modify data.
  //
  // example, this assumes the previous version is less than
  // 3.28.0, so 3.27.0 would be upgraded in this case.
  // _update["3.28.0"] = function(data) {
  //   return data;
  // };
  //
  // always add the version in increasing order so the
  // most recent version is last.
  var _update = {};

  _update["1.0.0"] = function(data) {
    data.version = "1.0.0";
    return data;
  };

  _update["2.0.0"] = function(data) {
    // major state overhaul
    data.state = {
      header: {
        date: {
          characterLength: "short",
          show: {
            date: true,
            day: false,
            month: true,
            year: false,
            separator: true
          }
        },
        clock: {
          hour24: true,
          show: {
            seconds: true,
            minutes: true,
            hours: true,
            separator: true,
            meridiem: true
          }
        },
        editAdd: {
          active: true
        },
        accent: {
          active: true
        },
        search: {
          searching: false,
          active: true,
          grow: true,
          engine: {
            selected: "google",
            google: {
              url: "https://www.google.com/search"
            },
            duckduckgo: {
              url: "https://duckduckgo.com/"
            },
            giphy: {
              url: "https://giphy.com/search/"
            },
            custom: {
              url: ""
            }
          }
        },
        buttons: {
          show: true
        }
      },
      link: {
        editObject: null,
        action: null,
        newTab: false,
        style: "block",
        sort: "none"
      },
      layout: {
        alignment: "left",
        container: "wide",
        scrollPastEnd: true,
        theme: {
          current: {
            r: 255,
            g: 170,
            b: 51
          },
          random: false
        }
      },
      edit: {
        active: false
      },
      menu: {
        open: false,
        active: false
      },
      modal: {
        active: false
      }
    };
    // version 1.0.0 bookmarks are not compatible so need to be reset
    data.bookmarks = [];
    return data;
  };

  _update["2.1.0"] = function(data) {
    data.state.layout.theme = {
      current: data.state.layout.theme.current,
      random: false
    };
    return data;
  };

  _update["2.3.0"] = function(data) {
    data.state.layout.theme.random = {
      active: data.state.layout.theme.random,
      style: "any"
    };
    return data;
  };

  _update["2.4.0"] = function(data) {
    data.state.link.show = {
      active: true,
      name: true,
      url: true
    };
    data.state.layout.alignment = {
      horizontal: "left",
      vertical: "top"
    };
    data.state.background = {
      image: {
        active: false,
        url: "../background/gray-steps.jpg",
        blur: 0,
        opacity: 1,
        grayscale: 0,
        accentOpacity: 0
      }
    };
    return data;
  };

  _update["2.5.0"] = function(data) {
    data.state.header.search.focus = false;
    return data;
  };

  _update["2.7.0"] = function(data) {
    // update date character length
    data.state.header.date.character = {
      length: data.state.header.date.characterLength
    };
    // change editAdd active to show
    data.state.header.editAdd.show = data.state.header.editAdd.active;
    delete data.state.header.editAdd.active;
    // change editAdd active to show
    data.state.header.accent.show = data.state.header.accent.active;
    delete data.state.header.accent.active;
    // move alignment into header
    data.state.header.alignment = {
      horizontal: data.state.layout.alignment.horizontal,
      vertical: data.state.layout.alignment.vertical
    };
    delete data.state.layout.alignment;
    // change header search
    data.state.header.search.show = data.state.header.search.active;
    delete data.state.header.search.active;
    // move searching
    data.state.search = {
      active: false
    };
    delete data.state.header.search.searching;
    // change links to bookmarks
    data.state.bookmarks = data.state.link;
    delete data.state.link;
    // change bookmarks show
    data.state.bookmarks.show.link = data.state.bookmarks.show.active;
    delete data.state.bookmarks.show.active;
    // move edit
    data.state.bookmarks.edit = false;
    delete data.state.edit;
    // change layout width
    data.state.layout.width = data.state.layout.container;
    delete data.state.layout.container;
    // change background active
    data.state.background.image.show = data.state.background.image.active;
    delete data.state.background.image.active;
    // change background accent
    data.state.background.image.accent = data.state.background.image.accentOpacity;
    delete data.state.background.image.accentOpacity;
    // change menu active
    data.state.menu.show = data.state.menu.active;
    delete data.state.menu.active;
    delete data.state.menu.open;
    // update version
    return data;
  };

  _update["2.8.0"] = function(data) {
    data.state.layout.title = "New Tab";
    return data;
  };

  _update["2.9.0"] = function(data) {
    data.state.header.shade = {
      show: true,
      padding: 4,
      style: "scroll",
      opacity: 0.95,
      border: {
        top: false,
        bottom: false
      }
    };
    return data;
  };

  _update["2.10.0"] = function(data) {
    data.state.header.shade = {
      show: true,
      padding: 4,
      style: "scroll",
      opacity: 0.95,
      border: {
        top: false,
        bottom: false
      }
    };
    return data;
  };

  _update["2.11.0"] = function(data) {
    data.state.header.greeting = {
      show: false,
      type: "good",
      name: ""
    };
    return data;
  };

  _update["2.11.0"] = function(data) {
    data.state.header.greeting = {
      show: false,
      type: "good",
      name: ""
    };
    return data;
  };

  _update["2.12.0"] = function(data) {
    data.state.bookmarks.link = {
      show: data.state.bookmarks.show.link
    };
    data.state.bookmarks.name = {
      show: data.state.bookmarks.show.name
    };
    data.state.bookmarks.url = {
      show: data.state.bookmarks.show.url,
      style: "dark"
    };
    delete data.state.bookmarks.show;
    data.state.theme = {
      accent: {
        current: data.state.layout.theme.current,
        random: data.state.layout.theme.random
      },
      style: "dark"
    };
    delete data.state.layout.theme;
    return data;
  };

  _update["2.14.0"] = function(data) {
    data.state.layout.width = 72;
    return data;
  };

  _update["2.16.0"] = function(data) {
    data.state.header.shade.padding = {
      top: data.state.header.shade.padding,
      bottom: data.state.header.shade.padding
    };
    data.state.header.shade.border = {
      top: {
        show: data.state.header.shade.border.top,
        width: 1
      },
      bottom: {
        show: data.state.header.shade.border.bottom,
        width: 1
      }
    };
    return data;
  };

  _update["2.17.0"] = function(data) {
    data.state.header.search.engine.google.name = "Google";
    data.state.header.search.engine.duckduckgo.name = "Duck Duck Go";
    data.state.header.search.engine.giphy.name = "Giphy";
    return data;
  };

  _update["2.19.0"] = function(data) {
    data.state.header.search.engine.youtube = {
      url: "https://www.youtube.com/results?search_query=",
      name: "YouTube"
    };
    data.state.header.search.engine.custom.name = "";
    return data;
  };

  _update["2.20.0"] = function(data) {
    data.state.header.search.width = {
      style: "auto",
      custom: 30
    };
    data.state.header.search.text = {
      align: "left"
    };
    delete data.state.header.search.grow;
    return data;
  };

  _update["2.21.0"] = function(data) {
    data.state.header.clock = {
      hours: {
        show: data.state.header.clock.show.hours,
        display: "number"
      },
      minutes: {
        show: data.state.header.clock.show.minutes,
        display: "number"
      },
      seconds: {
        show: data.state.header.clock.show.seconds,
        display: "number"
      },
      separator: {
        show: data.state.header.clock.show.separator
      },
      meridiem: {
        show: data.state.header.clock.show.meridiem
      },
      hour24: {
        show: data.state.header.clock.hour24
      }
    };
    data.state.header.date = {
      day: {
        show: data.state.header.date.show.day,
        display: "word",
        weekStart: "monday",
        length: data.state.header.date.character.length
      },
      date: {
        show: data.state.header.date.show.date,
        display: "number",
        ordinal: true
      },
      month: {
        show: data.state.header.date.show.month,
        display: "word",
        length: data.state.header.date.character.length,
        ordinal: true
      },
      year: {
        show: data.state.header.date.show.year,
        display: "number"
      },
      separator: {
        show: data.state.header.date.show.separator
      },
      format: "datemonth"
    };
    data.state.header.transitional = {
      show: false,
      type: "timeanddate"
    };
    return data;
  };

  _update["2.22.0"] = function(data) {
    data.bookmarks.forEach(function(item, index) {
      item.accent = {
        override: false,
        color: {
          r: null,
          g: null,
          b: null
        }
      };
    });
    return data;
  };

  _update["3.0.0"] = function(data) {
    data.bookmarks.forEach(function(item, index) {
      item.display = "letter";
      item.icon = {
        name: null,
        prefix: null,
        label: null
      };
    });
    return data;
  };

  _update["3.1.0"] = function(data) {
    data.state.header.area = {
      width: 90,
      alignment: {
        horizontal: "center"
      }
    };
    data.state.header.items = {
      alignment: {
        horizontal: "left"
      }
    };
    delete data.state.header.alignment;
    data.state.link = data.state.bookmarks;
    delete data.state.bookmarks;
    data.state.link.area = {
      width: 90,
      alignment: {
        horizontal: "center"
      }
    };
    data.state.link.items = {
      width: 12,
      alignment: {
        horizontal: "left"
      }
    };
    data.state.link.show = data.state.link.link.show;
    delete data.state.link.link;
    data.state.link.fit = "best";
    delete data.state.link.editObject;
    data.state.layout.alignment = {
      horizontal: "center",
      vertical: "center"
    };
    data.state.edge = false;
    data.state.autoSuggest = false;
    return data;
  };

  _update["3.2.0"] = function(data) {
    data.state.link.display = {
      show: true,
      alignment: {
        horizontal: "center",
        vertical: "center"
      },
      letter: {
        size: 2
      },
      icon: {
        size: 2.5
      }
    };
    return data;
  };

  _update["3.4.0"] = function(data) {
    data.state.header.padding = data.state.header.shade.padding;
    delete data.state.header.shade.padding;
    data.state.header.border = data.state.header.shade.border;
    delete data.state.header.shade.border;
    return data;
  };

  _update["3.6.0"] = function(data) {
    data.state.header.item = data.state.header.items;
    delete data.state.header.items;
    data.state.link.area.gap = 2;
    delete data.state.link.items;
    data.state.link.item = {
      size: 1,
      display: data.state.link.display,
      name: data.state.link.name,
      url: data.state.link.url
    };
    data.state.link.item.name.size = 0.9;
    delete data.state.link.display;
    delete data.state.link.name;
    delete data.state.link.url;
    return data;
  };

  _update["3.7.0"] = function(data) {
    data.state.link.item.line = {
      show: true
    };
    return data;
  };

  _update["3.8.0"] = function(data) {
    data.state.header.clock.size = 1;
    data.state.header.date.size = 1;
    data.state.header.greeting.size = 1;
    data.state.header.transitional.size = 1;
    data.state.header.search.style = data.state.header.search.width.style;
    data.state.header.search.width = data.state.header.search.width.custom;
    data.state.header.search.size = 1;
    data.state.header.button = {
      editAdd: {
        show: data.state.header.editAdd.show
      },
      accent: {
        show: data.state.header.accent.show
      },
      size: 1
    };
    delete data.state.header.editAdd;
    data.state.theme.radius = 0.2;
    return data;
  };

  _update["3.9.0"] = function(data) {
    delete data.state.header.padding;
    data.state.header.radius = false;
    data.state.header.border = {
      top: 0,
      bottom: 0
    };
    data.state.layout.padding = 4;
    data.state.layout.gutter = 2;
    data.state.background.image.scale = 1;
    delete data.state.link.area.gap;
    return data;
  };

  _update["3.10.0"] = function(data) {
    data.state.header.button.style = "box";
    return data;
  };

  _update["3.11.0"] = function(data) {
    data.state.link.item.line = data.state.link.item.line.show;
    data.state.link.item.hoverScale = true;
    return data;
  };

  _update["3.15.0"] = function(data) {
    delete data.state.link.sort;
    return data;
  };

  _update["3.18.0"] = function(data) {
    data.nighttab = true;
    return data;
  };

  _update["3.20.0"] = function(data) {
    data.state.link.item.url = data.state.link.item.url.show;
    return data;
  };

  _update["3.21.0"] = function(data) {
    data.state.layout.order = "headerLink";
    return data;
  };

  _update["3.27.0"] = function(data) {
    // swicth to single values for alignment controls
    // no more horizontal or vertical keys in state object
    data.state.header.area.alignment = data.state.header.area.alignment.horizontal;
    data.state.header.item.alignment = data.state.header.item.alignment.horizontal;
    data.state.header.search.text.alignment = data.state.header.search.text.align;
    delete data.state.header.search.text.align;
    data.state.link.area.alignment = data.state.link.area.alignment.horizontal;
    data.state.link.item.display.alignment = data.state.link.item.display.alignment.vertical + data.state.link.item.display.alignment.horizontal;
    data.state.layout.alignment = data.state.layout.alignment.vertical + data.state.layout.alignment.horizontal;
    return data;
  };

  _update["3.28.0"] = function(data) {
    // add bing search engine
    data.state.header.search.engine.bing = {
      url: "https://www.bing.com/search?q=",
      name: "Bing"
    };
    return data;
  };

  function run(data) {
    if (!("version" in data)) {
      // legacy update as first version of nightTab did not have a version number stored in the state
      data = _update["1.0.0"](data);
    };
    if (typeof data.version == "number") {
      // old version numbers were type of number
      // change them to strings to support new version checking
      data.version = data.version.toString().split(".")
      data.version.push("0");
      data.version = data.version.join(".");
    };

    for (var key in _update) {
      if (version.compare(data.version, key) == -1) {
        console.log("\t= running update", key);
        data = _update[key](data);
        data.version = key;
      };
    };

    // if no update is needed version bump
    if (version.compare(data.version, version.get()) == -1) {
      console.log("\t= nothing to update, version bump to", version.get());
      data.version = version.get();
    };

    return data;
  };

  // exposed methods
  return {
    run: run
  };

})();