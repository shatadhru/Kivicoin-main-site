'use strict';

// menu options custom affix
var fixed_top = $(".header");
$(window).on("scroll", function(){
    if( $(window).scrollTop() > 50){  
        fixed_top.addClass("animated fadeInDown menu-fixed");
    }
    else{
        fixed_top.removeClass("animated fadeInDown menu-fixed");
    }
});

// mobile menu js
$(".navbar-collapse>ul>li>a, .navbar-collapse ul.sub-menu>li>a").on("click", function() {
  const element = $(this).parent("li");
  if (element.hasClass("open")) {
    element.removeClass("open");
    element.find("li").removeClass("open");
  }
  else {
    element.addClass("open");
    element.siblings("li").removeClass("open");
    element.siblings("li").find("li").removeClass("open");
  }
});

let img=$('.bg_img');
img.css('background-image', function () {
	let bg = ('url(' + $(this).data('background') + ')');
	return bg;
});

// Show or hide the sticky footer button
$(window).on("scroll", function() {
	if ($(this).scrollTop() > 200) {
			$(".scroll-to-top").fadeIn(200);
	} else {
			$(".scroll-to-top").fadeOut(200);
	}
});

// Animate the scroll to top
$(".scroll-to-top").on("click", function(event) {
	event.preventDefault();
	$("html, body").animate({scrollTop: 0}, 300);
});


//preloader js code
$(".preloader").delay(300).animate({
	"opacity" : "0"
	}, 300, function() {
	$(".preloader").css("display","none");
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


/* ==============================
					slider area
================================= */

// testimonial slider 
$('.testimonial-slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  // autoplay: true,
  prevArrow: '<div class="prev"><i class="las la-angle-left"></i></div>',
  nextArrow: '<div class="next"><i class="las la-angle-right"></i></div>',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});


$('.payment-slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  prevArrow: '<div class="prev"><i class="las la-angle-left"></i></div>',
  nextArrow: '<div class="next"><i class="las la-angle-right"></i></div>',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
});


let lastScrollTop = 0;
const banner = document.querySelector(".ramadan-offer-banner");
const headerBottom = document.querySelector(".header__bottom");
let scrollTimeout;

window.addEventListener("scroll", () => {
  // Throttle scroll event for better performance
  if (scrollTimeout) clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scroll down → hide banner
      banner.classList.add("hidden");
      headerBottom.style.paddingTop = "0"; // Remove extra space when banner hides
    } else {
      // Scroll up → show banner
      banner.classList.remove("hidden");
      headerBottom.style.paddingTop = "40px"; // Restore padding when banner reappears
    }

    lastScrollTop = scrollTop;
  }, 50); // Adjust timeout for smoother scroll behavior
});

// Add pause on hover
document.querySelectorAll(".scroll-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    document.querySelector(".scroll-track").style.animationPlayState = "paused";
  });
  card.addEventListener("mouseleave", () => {
    document.querySelector(".scroll-track").style.animationPlayState =
      "running";
  });
});

// Speed control example
function setSpeed(speed) {
  document.documentElement.style.setProperty("--scroll-speed", `${speed}s`);
}


// Premium loading system for packages
function showPackageLoading() {
  $('#packages-container').html(`
    <div class="col-12 package-loading">
      <div class="loading-animation"></div>
    </div>
  `);
  
  // Simulate loading delay (replace with actual package loading)
  setTimeout(loadPackages, 2000);
}

function loadPackages() {
  // This would be replaced with your actual package loading code
  $('#packages-container').html(`
    <!-- Your package HTML here -->
  `);
  
  // Add animation to packages after loading
  $('.package-card').each(function(index) {
    $(this).css('opacity', 0)
      .delay(100 * index)
      .animate({opacity: 1}, 500);
  });
}

// Initialize on page load
$(document).ready(function() {
  showPackageLoading();
  
  // Enhanced scroll animations
  $('a[href*="#"]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top - 100,
      },
      800,
      'easeInOutExpo'
    );
  });
  
  // Get Funded button redirect
  $('a.cmn-btn[href="#0"]').attr('href', 'https://client.kivicoin.com');
});

// Update the scrolling payout cards with country flags
const payoutData = [
  { amount: "$18,345", name: "John D.", country: "us" },
  { amount: "$22,500", name: "Maria G.", country: "es" },
  { amount: "$15,750", name: "Ahmed K.", country: "sa" },
  { amount: "$30,000", name: "Lisa T.", country: "gb" },
  { amount: "$12,500", name: "Carlos M.", country: "mx" },
  { amount: "$27,800", name: "Sarah L.", country: "ca" },
  { amount: "$19,600", name: "David R.", country: "au" },
  { amount: "$23,400", name: "Emma W.", country: "de" },
  { amount: "$16,250", name: "Michael B.", country: "fr" }
];

function createPayoutCards() {
  const scrollTrack = document.querySelector('.scroll-track');
  // Duplicate for seamless looping
  const cards = [...payoutData, ...payoutData];
  
  scrollTrack.innerHTML = cards.map(user => `
    <div class="scroll-card">
      <div class="card-content">
        <div class="payout-amount">${user.amount}</div>
        <div class="user-name">
          <img src="https://flagcdn.com/16x12/${user.country}.png" 
               class="user-flag" 
               alt="${user.country}">
          ${user.name}
        </div>
        <div class="receipt-bg"></div>
      </div>
    </div>
  `).join('');
}

// Initialize on page load
$(document).ready(function() {
  createPayoutCards();
});




 // Fetch and display packages dynamically on DOM content load
  document.addEventListener("DOMContentLoaded", async function () {
    try {
      // Fetch data from API
      const response = await fetch("https://server.kivicoin.com/packages/data"); 
      const packages = await response.json(); // Parse the JSON response

      const packageContainer = document.getElementById("packages-container"); // Container for packages
      packageContainer.innerHTML = ""; // Clear existing static packages

      // Loop through the fetched packages and create dynamic cards
      packages.forEach((pkg) => {
        const packageCard = `
          <div class="col-xl-3 col-lg-4 col-md-6 mb-30">
            <div class="package-card text-center bg_img" data-background="assets/images/bg/bg-4.png">
              <h4 class="package-card__title base--color mb-2">${pkg.Package_Name}</h4>
              <ul class="package-card__features mt-4">
                <li>Return ${pkg.Return_Persentage}%</li>
                <li>Every ${pkg.Time_Every}</li>
                <li>For ${pkg.For__time}</li>
                <li>Total ${pkg.Capital_span}</li>
              </ul>
              <div class="package-card__range mt-5 base--color">$${pkg.price}</div>
              <a href="https://client.kivicoin.com" class="cmn-btn btn-md mt-4">Invest Now</a>
            </div>
          </div>
        `;

        // Append the dynamically generated card
        packageContainer.innerHTML += packageCard; 
      });
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  });


    document.addEventListener("DOMContentLoaded", async function () {
      try {
        // Fetch data from API
        const response = await fetch("https://server.kivicoin.com/packages/data");
        const packages = await response.json(); // Parse the JSON response

        const planSelector = document.getElementById("plan-selector"); // Dropdown for plan selection
        const investAmountInput = document.getElementById("invest_amount");
        const profitAmountInput = document.getElementById("profit_amount");

        // Populate the plan selector with package names
        packages.forEach((pkg) => {
          const option = document.createElement("option");
          option.value = pkg.Package_Name;
          option.textContent = pkg.Package_Name;
          planSelector.appendChild(option);
        });

        // Function to calculate profit
        function calculateProfit() {
          const selectedPlanName = planSelector.value; // Get selected plan name
          const selectedPackage = packages.find(
            (pkg) => pkg.Package_Name === selectedPlanName
          ); // Find the selected package

          const investAmount = parseFloat(investAmountInput.value); // Get the investment amount

          if (isNaN(investAmount) || investAmount <= 0) {
            profitAmountInput.value = "0.00"; // Set profit to 0 if input is invalid
            return;
          }

          const profitPercentage = selectedPackage.Return_Persentage; // Get the profit percentage for selected plan
          const profitAmount = (investAmount * profitPercentage) / 100; // Calculate profit
          profitAmountInput.value = profitAmount.toFixed(2); // Display profit with two decimal points
        }

        // Event listeners for changes in input fields
        planSelector.addEventListener("change", calculateProfit); // Trigger calculation on plan change
        investAmountInput.addEventListener("input", calculateProfit); // Trigger calculation on investment change
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    });
    
  

function createPayoutCards() {
  const scrollTrack = document.querySelector('.scroll-track');
  const cards = [...payoutData, ...payoutData]; // ডুপ্লিকেট করে ইনফিনিট লুপ

  scrollTrack.innerHTML = cards.map(user => `
    <div class="scroll-card">
      <div class="payout-amount">${user.amount}</div>
      <div class="user-name">
        <img src="https://flagcdn.com/16x12/${user.country}.png" 
             class="user-flag" 
             alt="${user.country}">
        ${user.name}
      </div>
    </div>
  `).join('');
}

document.addEventListener("DOMContentLoaded", createPayoutCards);


    
    