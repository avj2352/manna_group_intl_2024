

import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { IProductRecord } from "@/common/interfaces";
import useLocalStorage from "@/hooks/use-localstorage";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "@/assets/images/logo-img.png";
import { useCheckoutStore } from "@/common/state/features/checkout/checkout.slice";
import "@/styles/manna-redesign.css";


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
export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsGuest } = useAuthStore();

  const {
  checkout_items,
  is_cart_displayed,
  setIsCartDisplayed,
  setCheckoutCount,
} = useCheckoutStore();

const { storedValue, setStoredValue } =
  useLocalStorage<IProductRecord[]>("products", []);

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
  return total + Number(item.product.price) * item.quantity;
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

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleContactClick = () => {
    closeMenu();

    const contactSection = document.getElementById("contact-section");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    navigate("/");

    window.setTimeout(() => {
      document
        .getElementById("contact-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 600);
  };

  return (
    <>
      <header className="menu-bar">
        <Link
          to="/"
          className="menu-bar__logo"
          aria-label="Go to homepage"
          onClick={closeMenu}
        >
          <img
            src={logoImg}
            alt="Manna International"
            className="menu-bar__logo-img"
          />
        </Link>

        <ul className="menu-bar__nav">
          <li>
            <Link to="/" className="char-hover-text" onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about/100"
              className="char-hover-text"
              onClick={closeMenu}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/careers"
              className="char-hover-text"
              onClick={closeMenu}
            >
              Careers
            </Link>
          </li>

          <li>
            <button
              type="button"
              className="char-hover-text"
              onClick={handleContactClick}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "inherit",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
                lineHeight: "inherit",
                letterSpacing: "inherit",
              }}
            >
              Contact
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="menu-bar__cart"
          aria-label="View cart"
          onClick={() => setIsCartDisplayed(true)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>

          {checkout_items > 0 && (
            <span className="menu-bar__cart-badge visible">
              {checkout_items}
            </span>
          )}
        </button>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        className={`nav-overlay ${menuOpen ? "open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav
        className={`nav-sheet ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="nav-sheet__links">
          <li>
            <Link to="/" className="char-hover-text" onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about/100"
              className="char-hover-text"
              onClick={closeMenu}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/careers"
              className="char-hover-text"
              onClick={closeMenu}
            >
              Careers
            </Link>
          </li>

          <li>
            <button
              type="button"
              className="char-hover-text"
              onClick={handleContactClick}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "inherit",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
                lineHeight: "inherit",
                letterSpacing: "inherit",
              }}
            >
              Contact
            </button>
          </li>
        </ul>
            </nav>

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
                        onClick={() =>
                          handleDecreaseQuantity(product.product_id)
                        }
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
                        onClick={() =>
                          handleIncreaseQuantity(product)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mgi-drawer-item-remove"
                    aria-label={`Remove ${product.name}`}
                    onClick={() =>
                      handleRemoveItem(product.product_id)
                    }
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
                <p>Your cart is empty</p>
              </div>
            )}
          </aside>
        </>
      )}
    </>
  );
};