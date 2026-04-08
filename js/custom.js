// JavaScript Document

$(window).load(function () {
  "use strict";
  // makes sure the whole site is loaded
  $("#status").fadeOut(); // will first fade out the loading animation
  $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
  $("body").delay(350).css({
    overflow: "visible",
  });
});

$(document).ready(function () {
  "use strict";

  // scroll menu
  var sections = $(".section"),
    nav = $(".navbar-fixed-top,footer"),
    nav_height = nav.outerHeight();

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop();

    sections.each(function () {
      var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find("a").removeClass("active");
        sections.removeClass("active");

        $(this).addClass("active");
        nav.find('a[href="#' + $(this).attr("id") + '"]').addClass("active");
      }
    });
  });

  nav.find("a").on("click", function () {
    var $el = $(this),
      id = $el.attr("href");

    $("html, body").animate(
      {
        scrollTop: $(id).offset().top - nav_height + 2,
      },
      600
    );

    return false;
  });

  // Menu opacity
  if ($(window).scrollTop() > 80) {
    $(".navbar-fixed-top").addClass("bg-nav");
  } else {
    $(".navbar-fixed-top").removeClass("bg-nav");
  }
  $(window).scroll(function () {
    if ($(window).scrollTop() > 80) {
      $(".navbar-fixed-top").addClass("bg-nav");
    } else {
      $(".navbar-fixed-top").removeClass("bg-nav");
    }
  });

  // Parallax
  var parallax = function () {
    $(window).stellar();
  };

  $(function () {
    parallax();
  });

  // AOS
  AOS.init({
    duration: 1200,
    once: true,
    disable: "mobile",
  });

  // Contact Form

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
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
  });

  // validate contact form
  $(function () {
    $("#contact-form").validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        email: {
          required: true,
          email: true,
        },
        phone: {
          required: false,
        },
        message: {
          required: true,
        },
        title: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "This field is required",
          minlength: "your name must consist of at least 2 characters",
        },
        email: {
          required: "This field is required",
        },
        message: {
          required: "This field is required",
        },
      },
      submitHandler: function (form) {
        var formData = $(form).serializeArray();
        var requestBody = {};

        $.each(formData, function () {
          if (this.name != "submit") {
            requestBody[this.name] = this.value;
          }
        });
        console.log(requestBody);

        var jsonRequestBody = JSON.stringify(requestBody);
        // console.log(jsonRequestBody);

        $.ajax({
          type: "POST",
          contentType: "application/json",
          data: jsonRequestBody,
          dataType: "json",
          url: "https://nssu6t7o10.execute-api.us-east-2.amazonaws.com/v1/email",
          success: function () {
            $("#contact :input").attr("disabled", "disabled");
            $("#contact").fadeTo("slow", 1, function () {
              $(this).find(":input").attr("disabled", "disabled");
              $(this).find("label").css("cursor", "default");
              $("#success").fadeIn();
            });
          },
          error: function () {
            $("#contact").fadeTo("slow", 1, function () {
              $("#error").fadeIn();
            });
          },
        });
      },
    });
  });
});
