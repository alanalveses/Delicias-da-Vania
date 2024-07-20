(function () {
    "use strict";
  
    // iPad and iPod detection
    var isiPad = function () {
      return navigator.platform.indexOf("iPad") != -1;
    };
  
    var isiPhone = function () {
      return (
        navigator.platform.indexOf("iPhone") != -1 ||
        navigator.platform.indexOf("iPod") != -1
      );
    };
  
    var fullHeight = function () {
      if (!isiPad() && !isiPhone()) {
        $(".js-fullheight").css("height", $(window).height());
        $(window).resize(function () {
          $(".js-fullheight").css("height", $(window).height());
        });
      }
    };
  
    var sliderMain = function () {
      $("#vania-home .flexslider").flexslider({
        animation: "fade",
        slideshowSpeed: 5000,
      });
  
      $("#vania-home .flexslider .slides > li").css("height", $(window).height());
      $(window).resize(function () {
        $("#vania-home .flexslider .slides > li").css(
          "height",
          $(window).height()
        );
      });
    };
  
    /**
     * Brands Slider
     */
    new Swiper(".brands-slider", {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 60,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 80,
        },
        992: {
          slidesPerView: 6,
          spaceBetween: 120,
        },
      },
    });
  
    var sliderSayings = function () {
      $("#vania-sayings .flexslider").flexslider({
        animation: "slide",
        slideshowSpeed: 5000,
        directionNav: false,
        controlNav: true,
        smoothHeight: true,
        reverse: true,
      });
    };
  
    var offcanvasMenu = function () {
      $("body").prepend('<div id="vania-offcanvas" />');
      $("body").prepend(
        '<a href="#" class="js-vania-nav-toggle vania-nav-toggle"><i></i></a>'
      );
  
      $(".vania-main-nav .vania-menu-1 a, .vania-main-nav .vania-menu-2 a").each(
        function () {
          var $this = $(this);
  
          $("#vania-offcanvas").append($this.clone());
        }
      );
      // $('#vania-offcanvas').append
    };
  
    var mainMenuSticky = function () {
      var sticky = $(".js-sticky");
  
      sticky.css("height", sticky.height());
      $(window).resize(function () {
        sticky.css("height", sticky.height());
      });
  
      var $section = $(".vania-main-nav");
  
      $section.waypoint(
        function (direction) {
          if (direction === "down") {
            $section
              .css({
                position: "fixed",
                top: 0,
                width: "100%",
                "z-index": 99999,
              })
              .addClass("vania-shadow");
          }
        },
        {
          offset: "0px",
        }
      );
  
      $(".js-sticky").waypoint(
        function (direction) {
          if (direction === "up") {
            $section.attr("style", "").removeClass("vania-shadow");
          }
        },
        {
          offset: function () {
            return -$(this.element).height() + 69;
          },
        }
      );
    };
  
    // Parallax
    var parallax = function () {
      $(window).stellar();
    };
  
    // Burger Menu
    var burgerMenu = function () {
      $("body").on("click", ".js-vania-nav-toggle", function (event) {
        var $this = $(this);
  
        $("body").toggleClass("vania-overflow offcanvas-visible");
        $this.toggleClass("active");
        event.preventDefault();
      });
    };
  
    var scrolledWindow = function () {
      $(window).scroll(function () {
        var scrollPos = $(this).scrollTop();
  
        $("#vania-home .vania-text").css({
          opacity: 1 - scrollPos / 300,
          "margin-top": -212 + scrollPos / 1,
        });
  
        $("#vania-home .flexslider .vania-overlay").css({
          opacity: 0.5 + scrollPos / 2000,
        });
  
        if (scrollPos > 300) {
          $("#vania-home .vania-text").css("display", "none");
        } else {
          $("#vania-home .vania-text").css("display", "block");
        }
      });
  
      $(window).resize(function () {
        if ($("body").hasClass("offcanvas-visible")) {
          $("body").removeClass("offcanvas-visible");
          $(".js-vania-nav-toggle").removeClass("active");
        }
      });
    };
  
    var goToTop = function () {
      $(".js-gotop").on("click", function (event) {
        event.preventDefault();
  
        $("html, body").animate(
          {
            scrollTop: $("html").offset().top,
          },
          500
        );
  
        return false;
      });
    };
  
    // Page Nav
    var clickMenu = function () {
      var topVal = $(window).width() < 769 ? 0 : 58;
  
      $(window).resize(function () {
        topVal = $(window).width() < 769 ? 0 : 58;
      });
      $(
        '.vania-main-nav a:not([class="external"]), #vania-offcanvas a:not([class="external"])'
      ).click(function (event) {
        var section = $(this).data("nav-section");
  
        if ($('div[data-section="' + section + '"]').length) {
          $("html, body").animate(
            {
              scrollTop:
                $('div[data-section="' + section + '"]').offset().top - topVal,
            },
            500
          );
        }
  
        event.preventDefault();
  
        // return false;
      });
    };
  
    // Reflect scrolling in navigation
    var navActive = function (section) {
      $(
        ".vania-main-nav a[data-nav-section], #vania-offcanvas a[data-nav-section]"
      ).removeClass("active");
      $(".vania-main-nav, #vania-offcanvas")
        .find('a[data-nav-section="' + section + '"]')
        .addClass("active");
    };
  
    var navigationSection = function () {
      var $section = $("div[data-section]");
  
      $section.waypoint(
        function (direction) {
          if (direction === "down") {
            navActive($(this.element).data("section"));
          }
        },
        {
          offset: "150px",
        }
      );
  
      $section.waypoint(
        function (direction) {
          if (direction === "up") {
            navActive($(this.element).data("section"));
          }
        },
        {
          offset: function () {
            return -$(this.element).height() + 155;
          },
        }
      );
    };
  
    // Animations
    var homeAnimate = function () {
      if ($("#vania-home").length > 0) {
        $("#vania-home").waypoint(
          function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
              setTimeout(function () {
                $("#vania-home .to-animate").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeInUp animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 200);
  
              $(this.element).addClass("animated");
            }
          },
          { offset: "80%" }
        );
      }
    };
  
    var aboutAnimate = function () {
      var about = $("#vania-about");
      if (about.length > 0) {
        about.waypoint(
          function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
              setTimeout(function () {
                about.find(".to-animate").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeInUp animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 200);
  
              setTimeout(function () {
                about.find(".to-animate-2").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeIn animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 200);
  
              $(this.element).addClass("animated");
            }
          },
          { offset: "80%" }
        );
      }
    };
  
    var sayingsAnimate = function () {
      var sayings = $("#vania-sayings");
      if (sayings.length > 0) {
        sayings.waypoint(
          function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
              setTimeout(function () {
                sayings.find(".to-animate").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeInUp animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 200);
  
              $(this.element).addClass("animated");
            }
          },
          { offset: "80%" }
        );
      }
    };
  
    var featureAnimate = function () {
      var feature = $("#vania-featured");
      if (feature.length > 0) {
        feature.waypoint(
          function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
              setTimeout(function () {
                feature.find(".to-animate").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeInUp animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 200);
  
              setTimeout(function () {
                feature.find(".to-animate-2").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("bounceIn animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 500);
  
              $(this.element).addClass("animated");
            }
          },
          { offset: "80%" }
        );
      }
    };
  
    var typeAnimate = function () {
      var type = $("#vania-type");
      if (type.length > 0) {
        type.waypoint(
          function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
              setTimeout(function () {
                type.find(".to-animate").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeInUp animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 200);
  
              $(this.element).addClass("animated");
            }
          },
          { offset: "80%" }
        );
      }
    };
  
    var foodMenusAnimate = function () {
      var menus = $("#vania-menus");
      if (menus.length > 0) {
        menus.waypoint(
          function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
              setTimeout(function () {
                menus.find(".to-animate").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeInUp animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 200);
  
              setTimeout(function () {
                menus.find(".to-animate-2").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeIn animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 500);
  
              $(this.element).addClass("animated");
            }
          },
          { offset: "80%" }
        );
      }
    };
  
    var eventsAnimate = function () {
      var events = $("#vania-events");
      if (events.length > 0) {
        events.waypoint(
          function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
              setTimeout(function () {
                events.find(".to-animate").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeIn animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 200);
  
              setTimeout(function () {
                events.find(".to-animate-2").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeInUp animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 500);
  
              $(this.element).addClass("animated");
            }
          },
          { offset: "80%" }
        );
      }
    };
  
    var reservationAnimate = function () {
      var contact = $("#vania-contact");
      if (contact.length > 0) {
        contact.waypoint(
          function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
              setTimeout(function () {
                contact.find(".to-animate").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeIn animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 200);
  
              setTimeout(function () {
                contact.find(".to-animate-2").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeInUp animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 500);
  
              $(this.element).addClass("animated");
            }
          },
          { offset: "80%" }
        );
      }
    };
  
    var footerAnimate = function () {
      var footer = $("#vania-footer");
      if (footer.length > 0) {
        footer.waypoint(
          function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
              setTimeout(function () {
                footer.find(".to-animate").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeIn animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 200);
  
              setTimeout(function () {
                footer.find(".to-animate-2").each(function (k) {
                  var el = $(this);
  
                  setTimeout(
                    function () {
                      el.addClass("fadeInUp animated");
                    },
                    k * 200,
                    "easeInOutExpo"
                  );
                });
              }, 500);
  
              $(this.element).addClass("animated");
            }
          },
          { offset: "80%" }
        );
      }
    };
  
    // Document on load.
    $(function () {
      fullHeight();
      sliderMain();
      sliderSayings();
      offcanvasMenu();
      mainMenuSticky();
      parallax();
      burgerMenu();
      scrolledWindow();
      clickMenu();
      navigationSection();
      goToTop();
  
      // Animations
      homeAnimate();
      aboutAnimate();
      sayingsAnimate();
      featureAnimate();
      typeAnimate();
      foodMenusAnimate();
      eventsAnimate();
      reservationAnimate();
      footerAnimate();
    });
  })();
  