import logoImg from "@/assets/images/logo-img.png";

import { FC, useEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import { useCheckoutStore } from "@/common/state/features/checkout/checkout.slice";
import { useProductStore } from "@/common/state/features/products/product.slice";
import { IProductRecord } from "@/common/interfaces";
import useLocalStorage from "@/hooks/use-localstorage";

import { Navigation } from "@/pages/home/redesign/navigation";
import "@/styles/manna-redesign.css";

import { PRODUCTS } from "./product-data";
import "./product.css";

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

const ProductsPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { storedValue, setStoredValue } = useLocalStorage<IProductRecord[]>(
    "products",
    []
  );

  const {
  product_list,
  product_list_status,
  fetchProductListAPI,
} = useProductStore();
  const { setCheckoutCount } = useCheckoutStore();
  useEffect(() => {
  if (product_list_status === "initial") {
    void fetchProductListAPI();
  }
}, [product_list_status, fetchProductListAPI]);

  const product = useMemo(() => {
    if (!id) return null;

    return PRODUCTS[id] ?? null;
  }, [id]);

  const checkoutProduct = useMemo(() => {
    if (!product || !Array.isArray(product_list)) {
      return undefined;
    }

    return findCheckoutProduct(product_list, product.id, product.name);
  }, [product, product_list]);

  useEffect(() => {
    console.log("PRODUCT LIST FROM BACKEND:", product_list);
    console.log("CURRENT PAGE PRODUCT:", product);
    console.log("MATCHED CHECKOUT PRODUCT:", checkoutProduct);
  }, [product_list, product, checkoutProduct]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return Object.values(PRODUCTS).filter(
      (relatedProduct) => relatedProduct.id !== product.id
    );
  }, [product]);

  useEffect(() => {
    setCheckoutCount(storedValue.length);
  }, [storedValue, setCheckoutCount]);

  useEffect(() => {
    if (!product) return;

    document.title = `Manna International — ${product.name}`;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [product]);

  const addToCartHandler = () => {
    if (!checkoutProduct) {
      console.error(
        `The checkout product record for "${product?.name}" could not be found.`
      );

      return;
    }

    setStoredValue((previousProducts) => [
      ...previousProducts,
      checkoutProduct,
    ]);
  };

  if (!id || !product) {
    return <Navigate to="/404" replace />;
  }

  return (
    <main className="manna-redesign product-detail-page">
      <Navigation />

      {/* PRODUCT HERO */}
      <section className="pd-hero" id={product.id}>
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>

          <span aria-hidden="true">/</span>

          <Link to="/#products">Products</Link>

          <span aria-hidden="true">/</span>

          <span>{product.name}</span>
        </nav>

        <div className="pd-grid">
          <div className="pd-media">
            <div className={`pd-panel ${product.color}`}>
              <div className="mgi-tag">{product.tag}</div>

              <img src={product.img} alt={product.name} />
            </div>
          </div>

          <div className="pd-info">
            <h1 className="pd-title">{product.name}</h1>

            <p className="pd-price">${product.price.toFixed(2)}</p>

            <p className="pd-lede">{product.lede}</p>

            <ul className="pd-benefits">
              {product.benefits.map((benefit) => (
                <li key={benefit}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>

                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mgi-add pd-add-btn"
              onClick={addToCartHandler}
              disabled={!checkoutProduct}
              aria-label={`Add ${product.name} to cart`}
            >
              <span className="mgi-plus">+</span>

              <span className="mgi-addlabel">
                {checkoutProduct ? "Add to Cart" : "Currently Unavailable"}
              </span>
            </button>

            <div className="pd-badges">
              <span>US FDA Registered Facility</span>
              <span>Developed by Doctors</span>
              <span>Manufactured in USA</span>
            </div>

            <div className="pd-accordions">
              <details open>
                <summary>Key Benefits</summary>

                <div className="pd-accordion-body">
                  {product.benefitsLong}
                </div>
              </details>

              <details>
                <summary>How to Use</summary>

                <div className="pd-accordion-body">{product.usage}</div>
              </details>

              <details>
                <summary>Quality &amp; Manufacturing</summary>

                <div className="pd-accordion-body">
                  Every MANNA International product is developed by specialized
                  doctors and manufactured in the USA in a US FDA registered
                  facility, with quality as the core essence of our business.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="mgi-products pd-related">
        <div className="mgi-products-head">
          <span>Keep Exploring</span>
          <h2>You May Also Like</h2>
        </div>

        <div className="mgi-product-grid pd-related-grid">
          {relatedProducts.map((relatedProduct) => (
            <article className="mgi-card" key={relatedProduct.id}>
              <Link
                to={`/products/${relatedProduct.id}`}
                className="pd-related-link"
                aria-label={`View ${relatedProduct.name}`}
              >
                <div className={`mgi-card-top ${relatedProduct.color}`}>
                  <div className="mgi-tag">{relatedProduct.tag}</div>

                  <img
                    src={relatedProduct.img}
                    alt={relatedProduct.name}
                  />
                </div>

                <h3>{relatedProduct.name}</h3>

                <p className="mgi-price">
                  ${relatedProduct.price.toFixed(2)}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mgi-footer">
        <div className="mgi-footer-top">
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

            <Link to="/#contact-section" className="char-hover-text">
              Contact
            </Link>
          </nav>

          <nav className="mgi-footer-col">
            <h4>Products</h4>

            <Link to="/products/calcunix" className="char-hover-text">
              CalcuNix
            </Link>

            <Link to="/products/menoseg" className="char-hover-text">
              MenoSeg Plus
            </Link>

            <Link to="/products/prosante" className="char-hover-text">
              ProSante Plus
            </Link>

            <Link to="/products/manaliv" className="char-hover-text">
              ManaLiv
            </Link>
          </nav>

          <div className="mgi-footer-col mgi-footer-newsletter">
            <h4>Stay Updated</h4>

            <p>Get wellness tips and product updates in your inbox.</p>

            <form
              className="mgi-footer-form"
              onSubmit={(event) => event.preventDefault()}
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

        <div className="mgi-footer-wordmark" aria-hidden="true">
          <span>MANNAGROUPINTERNATIONAL</span>
        </div>

        <div className="mgi-footer-bottom">
          <p>© 2026 MANNA Group International. All rights reserved.</p>

          <div className="mgi-footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ProductsPage;