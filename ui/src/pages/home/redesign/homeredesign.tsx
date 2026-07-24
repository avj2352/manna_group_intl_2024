

import { useAuthStore } from "@/common/state/features/auth/auth.slice";


import logoImg from "@/assets/images/logo-img.png";
import { useCheckoutStore } from "@/common/state/features/checkout/checkout.slice";
import { useProductStore } from "@/common/state/features/products/product.slice";
import { IProductRecord } from "@/common/interfaces";
import useLocalStorage from "@/hooks/use-localstorage";

import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



import { useEffect } from "react";
import { feature } from "topojson-client";

import visionAnimation from "@/assets/manna-redesign/lottie/vision.json";
import valueAnimation from "@/assets/manna-redesign/lottie/value.json";
import missionAnimation from "@/assets/manna-redesign/lottie/mission.json";
import qualityAnimation from "@/assets/manna-redesign/lottie/quality.json";

import "@/styles/manna-redesign.css";
import { Navigation } from "./navigation";
import "@lottiefiles/lottie-player";


const PRODUCT_IMAGES: Record<string, string> = {
  calcunix:
    "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_53_18-PM.png",

  menoseg:
    "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_57_01-PM.png",

  prosanteplus:
  "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_56_13-PM.png",

  manaliv:
    "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_59_21-PM.png",
};


const normalizeValue = (value: unknown): string => {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
};

const findCheckoutProduct = (
  products: IProductRecord[],
  productId: string,
  productName: string
): IProductRecord | undefined => {
  const normalizedId = normalizeValue(productId);
  const normalizedName = normalizeValue(productName);

  return products.find((item) => {
    const record = item as unknown as Record<string, unknown>;

    const possibleValues = [
  record.product_id,
  record.id,
  record._id,
  record.slug,
  record.name,
  record.title,
  record.product_name,
  record.productName,
];

    return possibleValues.some((value) => {
      const normalizedValue = normalizeValue(value);

      if (!normalizedValue) {
        return false;
      }

      return (
        normalizedValue === normalizedId ||
        normalizedValue === normalizedName ||
        normalizedValue.includes(normalizedId) ||
        normalizedValue.includes(normalizedName) ||
        normalizedId.includes(normalizedValue) ||
        normalizedName.includes(normalizedValue)
      );
    });
  });
};


export const HomeRedesign = () => {
  const navigate = useNavigate();
  const { setIsGuest } = useAuthStore();
  const { storedValue, setStoredValue } = useLocalStorage<IProductRecord[]>(
  "products",
  []
);

const {
  product_list,
  product_list_status,
  fetchProductListAPI,
} = useProductStore();
const {
  is_cart_displayed,
  setIsCartDisplayed,
  setCheckoutCount,
} = useCheckoutStore();

useEffect(() => {
  if (product_list_status === "initial") {
    void fetchProductListAPI();
  }
}, [product_list_status, fetchProductListAPI]);

useEffect(() => {
  setCheckoutCount(storedValue.length);
}, [storedValue.length, setCheckoutCount]);



const groupedCartItems = storedValue.reduce<
  Record<string, { product: IProductRecord; quantity: number }>
>((groups, product) => {
  const key = product.product_id;

  if (!groups[key]) {
    groups[key] = {
      product,
      quantity: 0,
    };
  }

  groups[key].quantity += 1;

  return groups;
}, {});

const cartItems = Object.values(groupedCartItems);

const cartTotal = cartItems.reduce((total, item) => {
  return total + item.product.price * item.quantity;
}, 0);
const handleIncreaseQuantity = (product: IProductRecord) => {
  setStoredValue((previousProducts) => [
    ...previousProducts,
    product,
  ]);
};
const handleDecreaseQuantity = (productId: string) => {
  setStoredValue((previousProducts) => {
    const updatedProducts = [...previousProducts];

    const index = updatedProducts
      .map((product) => product.product_id)
      .lastIndexOf(productId);

    if (index !== -1) {
      updatedProducts.splice(index, 1);
    }

    return updatedProducts;
  });
};
const handleRemoveItem = (productId: string) => {
  setStoredValue((previousProducts) =>
    previousProducts.filter(
      (product) => product.product_id !== productId
    )
  );
};
const handleCheckout = () => {
  setIsGuest(true);
  setIsCartDisplayed(false);
  navigate("/shipping-address");
};
const handleAddToCart = (
  productId: string,
  productName: string
) => {
  console.log(
    "Add button clicked:",
    productId,
    productName,
    product_list
  );
  const checkoutProduct = findCheckoutProduct(
    product_list,
    productId,
    productName
  );

  if (!checkoutProduct) {
    console.error(
      `Could not find "${productName}" in the backend product list.`
    );

    return;
  }

  setStoredValue((previousProducts) => [
    ...previousProducts,
    checkoutProduct,
  ]);
};



  useEffect(() => {
  const canvas = document.getElementById("globe") as HTMLCanvasElement | null;
  const wrap = document.getElementById("globeWrap");
  const track = document.getElementById("citiesTrack");

  if (!canvas || !wrap || !track) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // CITY LIST
  const baseCities = [
    "United States",
    "Costa Rica",
    "Guyana",
    "Peru",
    "Philippines",
    "New Jersey (HQ)",
    "Los Angeles",
    "Tulsa",
    "Miami",
    "Chicago",
  ];

  const cities = [...baseCities, ...baseCities, ...baseCities];

  track.innerHTML = "";

  cities.forEach((city) => {
    const cityElement = document.createElement("div");
    cityElement.className = "city-name";
    cityElement.textContent = city;
    track.appendChild(cityElement);
  });

  let cityScrollY = 0;
  let cityAnimationFrame = 0;

  const animateCities = () => {
    cityScrollY -= 0.65;

    const oneThird = track.scrollHeight / 3;

    if (oneThird > 0 && Math.abs(cityScrollY) >= oneThird) {
      cityScrollY = 0;
    }

    track.style.transform = `translateY(${cityScrollY}px)`;
    cityAnimationFrame = requestAnimationFrame(animateCities);
  };

  animateCities();

  // GLOBE
  const accent = "#E8FF00";
  const accentRgb = "232,255,0";

  let rotationY = -80;
  let rotationX = 15;
  let velocityY = -0.1;
  let velocityX = 0;

  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let lastMoveTime = 0;

  let size = 0;
  let radius = 0;

  let globeAnimationFrame = 0;
  let geoFeatures: number[][][] = [];

  const pins = [
    { lon: -74, lat: 40.7, label: "North America" },
    { lon: -84.1, lat: 9.9, label: "Central America" },
    { lon: -58.9, lat: 6.8, label: "South America" },
    { lon: -77, lat: -12, label: "Peru" },
    { lon: 121, lat: 14.6, label: "SE Asia" },
  ];

  const resizeGlobe = () => {
    const rect = wrap.getBoundingClientRect();

    size = rect.width;

    canvas.width = Math.round(size * window.devicePixelRatio);
    canvas.height = Math.round(size * window.devicePixelRatio);

    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    ctx.setTransform(
      window.devicePixelRatio,
      0,
      0,
      window.devicePixelRatio,
      0,
      0
    );

    radius = size * 0.455;
  };

  resizeGlobe();

  const resizeObserver = new ResizeObserver(resizeGlobe);
  resizeObserver.observe(wrap);

  const toScreen = (longitude: number, latitude: number) => {
    const lambda = ((longitude + rotationY) * Math.PI) / 180;
    const phi = (latitude * Math.PI) / 180;
    const tilt = (rotationX * Math.PI) / 180;

    const x0 = Math.cos(phi) * Math.sin(lambda);
    const y0 = -Math.sin(phi);
    const z0 = Math.cos(phi) * Math.cos(lambda);

    const y1 = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
    const z1 = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);

    return {
      sx: size / 2 + x0 * radius,
      sy: size / 2 + y1 * radius,
      z: z1,
    };
  };

  const drawGlobe = () => {
    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;

    const sphereGradient = ctx.createRadialGradient(
      centerX - radius * 0.25,
      centerY - radius * 0.25,
      radius * 0.05,
      centerX,
      centerY,
      radius
    );

    sphereGradient.addColorStop(0, "rgba(194,232,252,0.95)");
    sphereGradient.addColorStop(1, "rgba(110,185,228,0.98)");

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = sphereGradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(10,37,64,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    ctx.strokeStyle = "rgba(10,37,64,0.08)";
    ctx.lineWidth = 0.5;

    for (let latitude = -60; latitude <= 60; latitude += 30) {
      ctx.beginPath();

      for (let longitude = -180; longitude <= 180; longitude += 4) {
        const { sx, sy } = toScreen(longitude, latitude);

        if (longitude === -180) {
          ctx.moveTo(sx, sy);
        } else {
          ctx.lineTo(sx, sy);
        }
      }

      ctx.stroke();
    }

    for (let longitude = -180; longitude < 180; longitude += 30) {
      ctx.beginPath();

      for (let latitude = -90; latitude <= 90; latitude += 4) {
        const { sx, sy } = toScreen(longitude, latitude);

        if (latitude === -90) {
          ctx.moveTo(sx, sy);
        } else {
          ctx.lineTo(sx, sy);
        }
      }

      ctx.stroke();
    }

    geoFeatures.forEach((ring) => {
      if (ring.length < 2) return;

      let previousZ: number | null = null;
      let started = false;

      ctx.beginPath();

      ring.forEach((point) => {
        const { sx, sy, z } = toScreen(point[0], point[1]);

        if (previousZ !== null && (previousZ < 0) !== (z < 0)) {
          ctx.beginPath();
          started = false;
        }

        if (!started) {
          ctx.moveTo(sx, sy);
          started = true;
        } else {
          ctx.lineTo(sx, sy);
        }

        previousZ = z;
      });

      const averageZ =
        ring.reduce(
          (total, point) => total + toScreen(point[0], point[1]).z,
          0
        ) / ring.length;

      if (averageZ > -0.08) {
        const alpha =
          averageZ > 0 ? Math.min(1, 0.2 + 0.55 * averageZ) : 0.05;

        ctx.strokeStyle = `rgba(10,37,64,${alpha})`;
        ctx.lineWidth = averageZ > 0 ? 0.5 + 0.5 * averageZ : 0.25;
        ctx.stroke();
      }
    });

    ctx.restore();

    const fontSize = Math.max(10, size * 0.028);
    ctx.font = `600 ${fontSize}px Inter, sans-serif`;

    pins.forEach((pin) => {
      const { sx, sy, z } = toScreen(pin.lon, pin.lat);

      if (z < 0.06) return;

      const alpha = Math.min(1, (z - 0.06) / 0.28);

      const pinGradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, 24);
      pinGradient.addColorStop(
        0,
        `rgba(${accentRgb},${(alpha * 0.6).toFixed(2)})`
      );
      pinGradient.addColorStop(1, `rgba(${accentRgb},0)`);

      ctx.beginPath();
      ctx.arc(sx, sy, 24, 0, Math.PI * 2);
      ctx.fillStyle = pinGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(sx, sy, 5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      if (alpha < 0.2) return;

      const textWidth = ctx.measureText(pin.label).width;
      const leftSide = pin.lon < -10;

      let labelX = leftSide ? sx - textWidth - 12 : sx + 12;

      labelX = Math.max(6, Math.min(size - textWidth - 6, labelX));

      const labelY = Math.max(fontSize + 4, Math.min(size - 6, sy));

      ctx.strokeStyle = `rgba(${accentRgb},${(alpha * 0.6).toFixed(2)})`;
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      ctx.moveTo(sx + (leftSide ? -6 : 6), sy);
      ctx.lineTo(
        leftSide ? labelX + textWidth + 2 : labelX - 2,
        labelY
      );
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.globalAlpha = alpha;
      ctx.fillText(pin.label, labelX, labelY);
      ctx.globalAlpha = 1;
    });
  };

  const autoRotationSpeed = -0.1;

  const animateGlobe = () => {
    if (!isDragging) {
      velocityY *= 0.93;
      velocityX *= 0.93;

      if (Math.abs(velocityY) < 0.015) {
        velocityY = autoRotationSpeed;
      }

      rotationY += velocityY;
      rotationX += velocityX;
      rotationX = Math.max(-50, Math.min(50, rotationX));
    }

    drawGlobe();
    globeAnimationFrame = requestAnimationFrame(animateGlobe);
  };

  const dragStart = (x: number, y: number) => {
    isDragging = true;
    lastMouseX = x;
    lastMouseY = y;
    lastMoveTime = performance.now();
    velocityY = 0;
    velocityX = 0;
  };

  const dragMove = (x: number, y: number) => {
    if (!isDragging) return;

    const elapsed = Math.max(1, performance.now() - lastMoveTime);
    const deltaX = x - lastMouseX;
    const deltaY = y - lastMouseY;

    velocityY = (deltaX / elapsed) * 12;
    velocityX = (-deltaY / elapsed) * 12;

    rotationY += deltaX * 0.28;
    rotationX -= deltaY * 0.28;

    lastMouseX = x;
    lastMouseY = y;
    lastMoveTime = performance.now();
  };

  const dragEnd = () => {
    isDragging = false;
  };

  const handleMouseDown = (event: MouseEvent) => {
    dragStart(event.clientX, event.clientY);
  };

  const handleMouseMove = (event: MouseEvent) => {
    dragMove(event.clientX, event.clientY);
  };

  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault();

    const touch = event.touches[0];
    dragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();

    const touch = event.touches[0];
    dragMove(touch.clientX, touch.clientY);
  };

  wrap.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", dragEnd);

  wrap.addEventListener("touchstart", handleTouchStart, {
    passive: false,
  });

  wrap.addEventListener("touchmove", handleTouchMove, {
    passive: false,
  });

  wrap.addEventListener("touchend", dragEnd);

  const abortController = new AbortController();

  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json", {
    signal: abortController.signal,
  })
    .then((response) => response.json())
    .then((world) => {
      const countries = feature(
        world as any,
        (world as any).objects.countries
      ) as any;

      countries.features.forEach((country: any) => {
        if (!country.geometry) return;

        const polygons =
          country.geometry.type === "Polygon"
            ? [country.geometry.coordinates]
            : country.geometry.type === "MultiPolygon"
              ? country.geometry.coordinates
              : [];

        polygons.forEach((polygon: number[][][][]) => {
          polygon.forEach((ring: number[][][]) => {
            geoFeatures.push(ring as unknown as number[][]);
          });
        });
      });

      animateGlobe();
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        animateGlobe();
      }
    });

  return () => {
    cancelAnimationFrame(cityAnimationFrame);
    cancelAnimationFrame(globeAnimationFrame);

    abortController.abort();
    resizeObserver.disconnect();

    wrap.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", dragEnd);

    wrap.removeEventListener("touchstart", handleTouchStart);
    wrap.removeEventListener("touchmove", handleTouchMove);
    wrap.removeEventListener("touchend", dragEnd);

    track.innerHTML = "";
  };
}, []);



useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const context = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".manna-stat-card");

    if (!cards.length) return;

    const isMobile = window.innerWidth <= 900;
    const stackY = [-90, -45, 0];

    if (isMobile) {
      gsap.set(cards[0], {
        y: stackY[0],
        x: 0,
        rotation: 0,
      });

      gsap.set(cards.slice(1), {
        y: 560,
        x: 70,
        rotation: -8,
      });
    } else {
      gsap.set(cards, {
        y: 560,
        x: 70,
        rotation: -8,
      });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".manna-stat-section",
        start: isMobile ? "top -45%" : "top top",
        end: isMobile ? "+=180%" : "+=320%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    cards.forEach((card, index) => {
      if (isMobile && index === 0) return;

      timeline.to(card, {
        y: stackY[index],
        x: 0,
        rotation: 0,
        duration: 1,
        ease: "none",
      });

      timeline.to({}, { duration: 0.2 });
    });

    ScrollTrigger.refresh();
  });

  return () => {
    context.revert();
  };
}, []);

useEffect(() => {
  const mobileBreakpoint = 1000;

  const isMobile = () => window.innerWidth < mobileBreakpoint;

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".char-hover-text")
  );

  const cleanups: Array<() => void> = [];

  elements.forEach((element) => {
    if (element.dataset.chtDone === "1") return;

    element.dataset.chtDone = "1";

    const originalText = element.textContent || "";

    element.innerHTML = "";

    originalText.split("").forEach((character) => {
      const wrapper = document.createElement("span");
      wrapper.className = "cht-char";

      const defaultCharacter = document.createElement("span");
      defaultCharacter.className = "cht-default";
      defaultCharacter.textContent =
        character === " " ? "\u00A0" : character;

      const hoverCharacter = document.createElement("span");
      hoverCharacter.className = "cht-hover";
      hoverCharacter.textContent =
        character === " " ? "\u00A0" : character;

      wrapper.appendChild(defaultCharacter);
      wrapper.appendChild(hoverCharacter);
      element.appendChild(wrapper);
    });

    const defaultCharacters =
      element.querySelectorAll<HTMLElement>(".cht-default");

    const hoverCharacters =
      element.querySelectorAll<HTMLElement>(".cht-hover");

    gsap.set(defaultCharacters, {
      yPercent: 0,
    });

    gsap.set(hoverCharacters, {
      yPercent: -100,
    });

    let timeline: gsap.core.Timeline | null = null;
    let touchTimer: number | undefined;

    const animateOut = () => {
      timeline?.kill();

      timeline = gsap.timeline();

      timeline.to(
        defaultCharacters,
        {
          yPercent: 100,
          duration: 0.3,
          ease: "power3.out",
          stagger: 0.01,
        },
        0
      );

      timeline.to(
        hoverCharacters,
        {
          yPercent: 0,
          duration: 0.3,
          ease: "power3.out",
          stagger: 0.01,
        },
        0.1
      );
    };

    const animateBack = () => {
      timeline?.kill();

      timeline = gsap.timeline();

      timeline.to(
        hoverCharacters,
        {
          yPercent: -100,
          duration: 0.4,
          ease: "power3.inOut",
          stagger: 0.01,
        },
        0
      );

      timeline.to(
        defaultCharacters,
        {
          yPercent: 0,
          duration: 0.4,
          ease: "power3.inOut",
          stagger: 0.01,
        },
        0.15
      );
    };

    const handleMouseEnter = () => {
      if (!isMobile()) animateOut();
    };

    const handleMouseLeave = () => {
      if (!isMobile()) animateBack();
    };

    const handleTouchStart = () => {
      if (!isMobile()) return;

      animateOut();

      window.clearTimeout(touchTimer);

      const totalDuration =
        (0.1 + 0.3 + defaultCharacters.length * 0.01) * 1000;

      touchTimer = window.setTimeout(animateBack, totalDuration);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    cleanups.push(() => {
      timeline?.kill();
      window.clearTimeout(touchTimer);

      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("touchstart", handleTouchStart);

      element.innerHTML = originalText;
      delete element.dataset.chtDone;
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}, []);


  return (
    <main className="manna-redesign">
      {/* NAVIGATION */}
      <Navigation />

      {/* HERO */}
      <section className="hero built-hero">
        <div className="hero-left">
          <h1 className="copy-heading">
            Innovative Wellness for Everyday Health
          </h1>

          <p className="copy-body">
            MANNA Group International is a New Jersey, USA based up-coming group
            of business divisions. MANNA Group International with one of its US
            FDA registered business unit &apos;MANNA International Corp.&apos;
            is engaged in manufacturing and marketing of products related to
            day-to-day overall health care of people.
          </p>

          <div className="hero-buttons">
            <a href="/products" className="manna-arrow-btn">
              <span className="manna-arrow-btn__text">Shop wellness</span>

              <span className="manna-arrow-btn__circle">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h12" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrap">
            <img
              src="https://hunnydeescloset.com/wp-content/uploads/2023/10/AdobeStock_616263868-scaled.jpeg"
              alt="Manna Group International wellness products"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
<section className="mgi-products">
  <div className="mgi-products-head">
    <span>Wellness Products</span>

    <h2 className="copy-body">
      Shop Everyday Health Essentials
    </h2>

    <p className="copy-body">
      Doctor-developed wellness supplements created to support daily health,
      balance, and confidence.
    </p>
  </div>

 <div className="mgi-product-grid">
  <article
    className="mgi-card"
    id="calcunix"
    data-id="calcunix"
    data-name="CalcuNix"
    data-price="89.99"
  >
    <div className="mgi-card-top blue">
      <Link
        to="/products/calcunix"
        className="mgi-card-product-link"
        aria-label="View CalcuNix product details"
      >
        <div className="mgi-tag">Kidney Care</div>

        <img
          src="https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_53_18-PM.png"
          alt="CalcuNix"
        />
      </Link>

      <button
  type="button"
  className="mgi-add"
  aria-label="Add CalcuNix to cart"
  onClick={() => handleAddToCart("calcunix", "CalcuNix")}
>
  <span className="mgi-plus">+</span>
  <span className="mgi-addlabel">Add</span>
</button>
    </div>

    <Link
      to="/products/calcunix"
      className="mgi-card-text-link"
      aria-label="View CalcuNix product details"
    >
      <h3>CalcuNix</h3>

      <p className="mgi-price">$89.99</p>

      <p className="mgi-desc">
        Maintaining Healthy Kidney functions Kidney cleansing &amp; detox
        Promoting Urinary Tract wellness.
      </p>
    </Link>
  </article>

  <article
    className="mgi-card"
    id="menoseg"
    data-id="menoseg"
    data-name="MenoSeg Plus"
    data-price="49.99"
  >
    <div className="mgi-card-top cream">
      <Link
        to="/products/menoseg"
        className="mgi-card-product-link"
        aria-label="View MenoSeg Plus product details"
      >
        <div className="mgi-tag">Women's Health</div>

        <img
          src="https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_57_01-PM.png"
          alt="MenoSeg Plus"
        />
      </Link>

      <button
  type="button"
  className="mgi-add"
  aria-label="Add MenoSeg Plus to cart"
  onClick={() => handleAddToCart("menoseg", "MenoSeg Plus")}
>
  <span className="mgi-plus">+</span>
  <span className="mgi-addlabel">Add</span>
</button>


    </div>

    <Link
      to="/products/menoseg"
      className="mgi-card-text-link"
      aria-label="View MenoSeg Plus product details"
    >
      <h3>MenoSeg Plus</h3>

      <p className="mgi-price">$49.99</p>

      <p className="mgi-desc">
        Supports relief from menopausal symptoms while promoting bone, skin and
        vaginal health.
      </p>
    </Link>
  </article>

  <article
    className="mgi-card"
    id="prosante"
    data-id="prosante"
    data-name="ProSante Plus"
    data-price="49.99"
  >
    <div className="mgi-card-top green">
      <Link
        to="/products/prosante"
        className="mgi-card-product-link"
        aria-label="View ProSante Plus product details"
      >
        <div className="mgi-tag">Prostate Health</div>

        <img
          src="https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_56_13-PM.png"
          alt="ProSante Plus"
        />
      </Link>

      <button
  type="button"
  className="mgi-add"
  aria-label="Add ProSante Plus to cart"
  onClick={() => handleAddToCart("prosante", "ProSante Plus")}
>
  <span className="mgi-plus">+</span>
  <span className="mgi-addlabel">Add</span>
</button>
    </div>

    <Link
      to="/products/prosante"
      className="mgi-card-text-link"
      aria-label="View ProSante Plus product details"
    >
      <h3>ProSante Plus</h3>

      <p className="mgi-price">$49.99</p>

      <p className="mgi-desc">
        Broad-ranging prostate support developed by specialized doctors and
        manufactured in the USA.
      </p>
    </Link>
  </article>

  <article
    className="mgi-card"
    id="manaliv"
    data-id="manaliv"
    data-name="ManaLiv"
    data-price="59.99"
  >
    <div className="mgi-card-top peach">
      <Link
        to="/products/manaliv"
        className="mgi-card-product-link"
        aria-label="View ManaLiv product details"
      >
        <div className="mgi-tag">Liver Health</div>

        <img
          src="https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_59_21-PM.png"
          alt="ManaLiv"
        />
      </Link>

      <button
  type="button"
  className="mgi-add"
  aria-label="Add ManaLiv to cart"
  onClick={() => handleAddToCart("manaliv", "ManaLiv")}
> <span className="mgi-plus">+</span>
  <span className="mgi-addlabel">Add</span>
  </button>
    </div>

    <Link
      to="/products/manaliv"
      className="mgi-card-text-link"
      aria-label="View ManaLiv product details"
    >
      <h3>ManaLiv</h3>

      <p className="mgi-price">$59.99</p>

      <p className="mgi-desc">
        Helps maintain liver health and digestive wellness with premium
        doctor-developed ingredients.
      </p>
    </Link>
  </article>
</div>

  <div className="mgi-cart-toast">
    Added to cart
  </div>
</section>

      {/* WHY CHOOSE MANNA */}
<section className="manna-stat-section">
  <div className="manna-stat-wrap">

    <div className="manna-stat-left">
      <h2 className="copy-body">
        WHY CHOOSE MANNA GROUP INTERNATIONAL?
      </h2>

      <p className="copy-body">
        MANNA International Corp. is introducing products in healthcare areas
        like Nutraceutical Supplements, OTC pharmaceuticals and Essential Oils.
        MANNA International Corp. is planning to introduce many clinically
        evaluated healthcare products targeted to specific health conditions and
        therapeutic areas.
      </p>
    </div>

    <div className="manna-stat-right">

      <div className="manna-stat-card manna-stat-green">
        <div className="manna-stat-icon">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="manna-stat-number">
          30+
        </div>

        <p>
          Years of healthcare industry experience guide our product direction
          and long-term vision.
        </p>
      </div>

      <div className="manna-stat-card manna-stat-red">
        <div className="manna-stat-icon">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 3l2.7 5.4 6 .9-4.3 4.2 1 6L12 16.8 6.6 19.5l1-6-4.3-4.2 6-.9L12 3Z" />
          </svg>
        </div>

        <div className="manna-stat-number">
          100%
        </div>

        <p>
          We focus on clinically evaluated healthcare products designed for
          targeted wellness needs.
        </p>
      </div>

      <div className="manna-stat-card manna-stat-blue">
        <div className="manna-stat-icon">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>

        <div className="manna-stat-number">
          Trust
        </div>

        <p>
          Honesty, integrity and transparency shape every relationship with our
          customers and stakeholders.
        </p>
      </div>

    </div>

  </div>
</section>

      {/* VALUES */}
<section className="values-section">

  <p className="values-eyebrow">Our Core</p>

  <h2 className="values-heading">
    Built on Purpose,
    <br />
    Driven by People
  </h2>

  <p className="values-sub">
    Every product we develop, every market we enter, and every partnership we
    build is guided by these four pillars.
  </p>

  <div className="values-grid">

    {/* Vision */}
    <div className="value-item">
      <div className="value-icon">
      <lottie-player
  src={JSON.stringify(visionAnimation)}
  background="transparent"
  speed="1.5"
  loop
  autoplay
  style={{ width: "72px", height: "72px" }}
></lottie-player>
      </div>

      <h3 className="value-title">Vision</h3>

      <p className="value-subtitle">
        A Healthier World by 2030
      </p>

      <div className="value-divider" />

      <p className="value-text">
        To be a globally recognised healthcare products provider and a part of
        day-to-day good health and wellness for our customers worldwide.
      </p>
    </div>

    {/* Value */}
    <div className="value-item">
      <div className="value-icon">
        <lottie-player
  src={JSON.stringify(valueAnimation)}
  background="transparent"
  speed="1.5"
  loop
  autoplay
  style={{ width: "72px", height: "72px" }}
></lottie-player>
      </div>

      <h3 className="value-title">Value</h3>

      <p className="value-subtitle">
        Honesty at Every Step
      </p>

      <div className="value-divider" />

      <p className="value-text">
        We practice honesty, integrity and transparency with our customers and
        stakeholders while building long-term relationships.
      </p>
    </div>

    {/* Mission */}
    <div className="value-item">
      <div className="value-icon">
        <lottie-player
  src={JSON.stringify(missionAnimation)}
  background="transparent"
  speed="1.5"
  loop
  autoplay
  style={{ width: "72px", height: "72px" }}
></lottie-player>
      </div>

      <h3 className="value-title">Mission</h3>

      <p className="value-subtitle">
        Focused Products, Real Results
      </p>

      <div className="value-divider" />

      <p className="value-text">
        To provide meaningful healthcare products that help people experience
        better day-to-day health and wellness.
      </p>
    </div>

    {/* Quality */}
    <div className="value-item">
      <div className="value-icon">
        <lottie-player
 src={JSON.stringify(qualityAnimation)}
  background="transparent"
  speed="1.5"
  loop
  autoplay
  style={{ width: "72px", height: "72px" }}
></lottie-player>
      </div>

      <h3 className="value-title">Quality</h3>

      <p className="value-subtitle">
        World-Class @ Affordability
      </p>

      <div className="value-divider" />

      <p className="value-text">
        Quality is at the heart of everything we do. We deliver world-class
        healthcare products that patients can actually afford.
      </p>
    </div>

  </div>

</section>

      {/* GLOBE */}
<section className="section">

  <div className="right-col">

    <div className="right-copy">
      <h2 className="headline copy-body">
        We've established presence in the world's key markets.
      </h2>

      <p className="subtext copy-body">
        Bringing wellness to audiences, cultures and communities.
        Boundless reach. Seamless delivery. We bring quality
        healthcare anywhere you need it.
      </p>
    </div>

    <div className="globe-wrap" id="globeWrap">
      <canvas id="globe"></canvas>
    </div>

  </div>

  <div className="cities-col">
    <div
      className="cities-track"
      id="citiesTrack"
    ></div>
  </div>

</section>

      {/* CONTACT */}
<section className="contact-section" id="contact-section">
  <div className="contact-wrap">

    <div className="contact-left">

      <h2 className="contact-heading">
        Quick Contacts
      </h2>

      <p className="contact-sub">
        Have questions? We're here to help!
      </p>

      {/* Corporate Office */}
      <div className="contact-item">

        <div className="contact-icon">
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="24"
      cy="24"
      r="19"
      stroke="#15153A"
      strokeWidth="2.2"
    />

    <ellipse
      cx="24"
      cy="24"
      rx="8"
      ry="19"
      stroke="#15153A"
      strokeWidth="2.2"
    />

    <line
      x1="5"
      y1="24"
      x2="43"
      y2="24"
      stroke="#15153A"
      strokeWidth="2.2"
    />

    <path
      d="M8 14.5C12.5 17 17.8 18.5 24 18.5C30.2 18.5 35.5 17 40 14.5"
      stroke="#15153A"
      strokeWidth="2.2"
    />

    <path
      d="M8 33.5C12.5 31 17.8 29.5 24 29.5C30.2 29.5 35.5 31 40 33.5"
      stroke="#15153A"
      strokeWidth="2.2"
    />
  </svg>
</div>

        <div className="contact-item-text">
          <h3>Corporate Office</h3>

          <p>
            2386 Morris Avenue,
            
            Union, New Jersey 07083,
           
            USA
          </p>
        </div>

      </div>

      {/* Manufacturing */}
      <div className="contact-item">

        <div className="contact-icon">
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="10"
      y="8"
      width="20"
      height="34"
      stroke="#15153A"
      strokeWidth="2.2"
    />

    <rect
      x="30"
      y="18"
      width="10"
      height="24"
      stroke="#15153A"
      strokeWidth="2.2"
    />

    <rect x="14.5" y="13" width="4" height="4" fill="#15153A" />
    <rect x="22" y="13" width="4" height="4" fill="#15153A" />

    <rect x="14.5" y="21" width="4" height="4" fill="#15153A" />
    <rect x="22" y="21" width="4" height="4" fill="#15153A" />

    <rect x="14.5" y="29" width="4" height="4" fill="#15153A" />
    <rect x="22" y="29" width="4" height="4" fill="#15153A" />

    <rect x="34" y="23" width="3" height="3" fill="#15153A" />
    <rect x="34" y="31" width="3" height="3" fill="#15153A" />

    <rect
      x="17"
      y="36"
      width="6"
      height="6"
      stroke="#15153A"
      strokeWidth="2"
    />
  </svg>
</div>

        <div className="contact-item-text">
          <h3>Manufacturing</h3>

          <p>
            301–325 Brunswick Avenue,
          
            Trenton, New Jersey 08618,
           
            USA
          </p>
        </div>

      </div>

      {/* Contact */}
      <div className="contact-item">

        <div className="contact-icon">
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 8H20L23 16L18.5 19C20.2 22.8 23.2 25.8 27 27.5L30 23L38 26V31C38 34.9 34.7 38 31 37.5C19.5 36 10 26.5 8.5 15C8 11.3 11.1 8 15 8Z"
      stroke="#15153A"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
</div>

        <div className="contact-item-text">
  <h3>Contact Us Online</h3>

  <p>
    <strong>Email:</strong>
    <br />
    info@mannagroupintl.com,
    <br />
    customercare@mannagroupintl.com,
    <br />
    sales@mannagroupintl.com
  </p>

  <p>
    <strong>Call:</strong>
  
    +1 (877) 638-1437
  </p>
</div>

      </div>

    </div>

    <div className="contact-right">

      <div className="contact-phone-wrap">

        <img
          src="https://hunnydeescloset.com/wp-content/uploads/2023/10/manna-mockup-transparent.png"
          alt="Contact MANNA"
          className="contact-phone-img"
        />

      </div>

    </div>

  </div>
</section>

      {/* FOOTER */}
<footer className="mgi-footer">

  <div className="mgi-footer-top">

    {/* Brand */}
    <div className="mgi-footer-brand">

      <img
  src={logoImg}
  alt="Manna International"
  className="mgi-footer-logo"
/>

      <p className="mgi-footer-tag">
        Innovative wellness for everyday health, proudly developed and
        manufactured in the USA.
      </p>

      <div className="mgi-footer-social">
  <a href="#" aria-label="Instagram">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  </a>

  <a href="#" aria-label="Facebook">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  </a>

  <a href="#" aria-label="LinkedIn">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="8" y1="11" x2="8" y2="16" />
      <line x1="8" y1="8" x2="8" y2="8" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <path d="M12 13c0-1.5 1.5-2 3-2s2 1 2 2v3" />
    </svg>
  </a>
</div>

    </div>

    {/* Company */}
<nav className="mgi-footer-col">
  <h4>Company</h4>

  <Link to="/" className="char-hover-text">
    Home
  </Link>

  <Link to="/about/100" className="char-hover-text">
    About
  </Link>

  <Link to="/careers" className="char-hover-text">
    Careers
  </Link>

  <button
    type="button"
    className="char-hover-text mgi-footer-link-button"
    onClick={() => {
      document
        .getElementById("contact-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
  >
    Contact
  </button>
</nav>

{/* Products */}
<nav className="mgi-footer-col">
  <h4>Products</h4>

  <Link
    to="/products/calcunix"
    className="char-hover-text"
  >
    CalcuNix
  </Link>

  <Link
    to="/products/menoseg"
    className="char-hover-text"
  >
    MenoSeg Plus
  </Link>

  <Link
    to="/products/prosante"
    className="char-hover-text"
  >
    ProSante Plus
  </Link>

  <Link
    to="/products/manaliv"
    className="char-hover-text"
  >
    ManaLiv
  </Link>
</nav>

    {/* Newsletter */}

    <div className="mgi-footer-col mgi-footer-newsletter">

      <h4>Stay Updated</h4>

      <p>
        Get wellness tips and product updates in your inbox.
      </p>

      <form
        className="mgi-footer-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Your email address"
          required
        />

        <button type="submit" aria-label="Subscribe">
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M5 12h12" />
    <path d="M13 6l6 6-6 6" />
  </svg>
</button>
      </form>

    </div>

  </div>

  <div
    className="mgi-footer-wordmark"
    aria-hidden="true"
  >
    <span>
      MANNAGROUPINTERNATIONAL
    </span>
  </div>

  <div className="mgi-footer-bottom">

    <p>
      © 2026 MANNA Group International. All rights reserved.
    </p>

    <div className="mgi-footer-legal">

      <a href="#">
        Privacy Policy
      </a>

      <a href="#">
        Terms of Service
      </a>

    </div>

  </div>

</footer>

{/* CART DRAWER */}

{is_cart_displayed && (
  <>
    <div
      className="mgi-drawer-overlay open"
      id="drawerOverlay"
      onClick={() => setIsCartDisplayed(false)}
    ></div>

    <aside
      className="mgi-drawer open"
      id="cartDrawer"
      aria-hidden="false"
    >
      <div className="mgi-drawer-head">
        <h2 className="mgi-drawer-title">
          Your Cart
        </h2>

        <button
          type="button"
          className="mgi-drawer-close"
          id="drawerClose"
          aria-label="Close cart"
          onClick={() => setIsCartDisplayed(false)}
        >
          ✕
        </button>
      </div>

      <div
  className="mgi-drawer-body"
  id="drawerBody"
>
  {cartItems.map(({ product, quantity }) => (
    <div
      className="mgi-drawer-item"
      key={product.product_id}
    >
      <img
        className="mgi-drawer-item-img"
        src={
  PRODUCT_IMAGES[normalizeValue(product.name)] ||
  product.assets?.[0] ||
  ""
}
        alt={product.name}
      />

      <div className="mgi-drawer-item-info">
        <p className="mgi-drawer-item-name">
          {product.name}
        </p>

        <p className="mgi-drawer-item-price">
          ${(Number(product.price) * quantity).toFixed(2)}
        </p>

        <div className="mgi-drawer-item-qty">
          <button
            type="button"
            className="mgi-qty-btn"
            aria-label={`Decrease ${product.name} quantity`}
            onClick={() => handleDecreaseQuantity(product.product_id)}
          >
            −
          </button>

          <span className="mgi-qty-num">
            {quantity}
          </span>

          <button
            type="button"
            className="mgi-qty-btn"
            aria-label={`Increase ${product.name} quantity`}
            onClick={() => handleIncreaseQuantity(product)}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="mgi-drawer-item-remove"
        aria-label={`Remove ${product.name}`}
        onClick={() => handleRemoveItem(product.product_id)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
        </svg>
      </button>
    </div>
  ))}
</div>

      <div
        className="mgi-drawer-footer"
        id="drawerFooter"
      >
        <div className="mgi-drawer-total">
          <span>Total</span>
          <span id="drawerTotal">
  ${cartTotal.toFixed(2)}
</span>
        </div>

        <button
  type="button"
  className="mgi-drawer-checkout"
  onClick={handleCheckout}
>
  Checkout
</button>
      </div>

      {cartItems.length === 0 && (
  <div
    className="mgi-drawer-empty"
    id="drawerEmpty"
  >
        <p>
          Your cart is empty
        </p>
      </div>
      )}
    </aside>
  </>
)}

</main>
  );
};