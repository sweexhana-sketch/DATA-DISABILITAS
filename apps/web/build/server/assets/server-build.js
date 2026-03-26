import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useNavigate, useLocation, Meta, Links, ScrollRestoration, Scripts, Outlet, useRouteError, useAsyncError, useSearchParams } from 'react-router';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import * as React from 'react';
import { createElement, forwardRef, useEffect, useRef, useState, Component, useCallback, Suspense } from 'react';
import { useButton } from '@react-aria/button';
import { f as fetchWithHeaders } from './index-2uSnybco.js';
import { SessionProvider, signIn, signOut, useSession } from '@hono/auth-js/react';
import { toPng } from 'html-to-image';
import { serializeError } from 'serialize-error';
import { Toaster, toast } from 'sonner';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ArrowLeft, Search, Filter, Eye, XCircle, CheckCircle, Clock, User, Building, Users, TrendingUp, Shield, AlertTriangle, FileText, Edit, Plus, X, Download, MoreHorizontal, MapPin, PieChart, Save } from 'lucide-react';
import { useParams as useParams$1 } from 'react-router-dom';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import fg from 'fast-glob';
import 'node:async_hooks';
import 'node:console';
import '@auth/core';
import '@auth/core/providers/credentials';
import '@hono/auth-js';
import '@neondatabase/serverless';
import 'argon2';
import 'hono';
import 'hono/context-storage';
import 'hono/cors';
import 'hono/proxy';
import 'hono/body-limit';
import 'hono/request-id';
import 'hono/factory';
import '@hono/node-server/serve-static';
import 'hono/aws-lambda';
import 'hono/logger';
import 'ws';
import '@auth/core/jwt';

const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: 'Module' }));

function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches(),
    };
    return createElement(Component, props);
  };
}

const JSX_RENDER_ID_ATTRIBUTE_NAME = "data-render-id";
function buildGridPlaceholder(w, h) {
  const size = Math.max(w, h);
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 895 895" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="895" height="895" fill="#E9E7E7"/>
<g>
<line x1="447.505" y1="-23" x2="447.505" y2="901" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="447.505" x2="5.66443" y2="447.505" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="278.068" x2="5.66443" y2="278.068" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="57.1505" x2="5.66443" y2="57.1504" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="61.8051" y1="883.671" x2="61.8051" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="282.495" y1="907" x2="282.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="611.495" y1="907" x2="611.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="832.185" y1="883.671" x2="832.185" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="827.53" x2="5.66443" y2="827.53" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="606.613" x2="5.66443" y2="606.612" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="4.3568" y1="4.6428" x2="889.357" y2="888.643" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="-0.3568" y1="894.643" x2="894.643" y2="0.642772" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.5" cy="441.5" r="163.995" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.911" cy="447.911" r="237.407" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="448" cy="442" r="384.495" stroke="#C0C0C0" stroke-width="1.00975"/>
</g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function useOptionalRef(ref) {
  const fallbackRef = useRef(null);
  if (ref && "instance" in ref) return fallbackRef;
  return ref ?? fallbackRef;
}
const CreatePolymorphicComponent = /* @__PURE__ */ forwardRef(
  // @ts-ignore
  function CreatePolymorphicComponentRender({
    as,
    children,
    renderId,
    onError,
    ...rest
  }, forwardedRef) {
    const props = as === "img" ? {
      ...rest,
      // keep the original type of onError for <img>
      onError: (e) => {
        if (typeof onError === "function") onError(e);
        const img = e.currentTarget;
        const {
          width,
          height
        } = img.getBoundingClientRect();
        img.dataset.hasFallback = "1";
        img.onerror = null;
        img.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        img.style.objectFit = "cover";
      }
    } : rest;
    const ref = useOptionalRef(forwardedRef);
    useEffect(() => {
      const el = ref && "current" in ref ? ref.current : null;
      if (!el) return;
      if (as !== "img") {
        const placeholder = () => {
          const {
            width,
            height
          } = el.getBoundingClientRect();
          return buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        };
        const applyBgFallback = () => {
          el.dataset.hasFallback = "1";
          el.style.backgroundImage = `url("${placeholder()}")`;
          el.style.backgroundSize = "cover";
        };
        const probeBg = () => {
          const bg = getComputedStyle(el).backgroundImage;
          const match = /url\(["']?(.+?)["']?\)/.exec(bg);
          const src = match?.[1];
          if (!src) return;
          const probe = new Image();
          probe.onerror = applyBgFallback;
          probe.src = src;
        };
        probeBg();
        const ro2 = new ResizeObserver(([entry]) => {
          if (!el.dataset.hasFallback) return;
          const {
            width,
            height
          } = entry.contentRect;
          el.style.backgroundImage = `url("${buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128)}")`;
        });
        ro2.observe(el);
        const mo = new MutationObserver(probeBg);
        mo.observe(el, {
          attributes: true,
          attributeFilter: ["style", "class"]
        });
        return () => {
          ro2.disconnect();
          mo.disconnect();
        };
      }
      if (!el.dataset.hasFallback) return;
      const ro = new ResizeObserver(([entry]) => {
        const {
          width,
          height
        } = entry.contentRect;
        el.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [as, ref]);
    return /* @__PURE__ */ createElement(as, Object.assign({}, props, {
      ref,
      ...renderId ? {
        [JSX_RENDER_ID_ATTRIBUTE_NAME]: renderId
      } : void 0
    }), children);
  }
);

function LoadFonts() {
  return /* @__PURE__ */ jsx(Fragment, {});
}

function useDevServerHeartbeat() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || typeof window === "undefined") {
      return;
    }
    const THROTTLE_MS = 6e4 * 3;
    let lastPulse = 0;
    const pulse = () => {
      const now = Date.now();
      if (now - lastPulse < THROTTLE_MS) {
        return;
      }
      lastPulse = now;
      fetch("/", {
        method: "GET"
      }).catch(() => {
      });
    };
    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((name) => window.addEventListener(name, pulse, { passive: true }));
    return () => {
      events.forEach((name) => window.removeEventListener(name, pulse));
    };
  }, []);
}

const __vite_import_meta_env__ = {};
const links = () => [];
if (globalThis.window && globalThis.window !== void 0) {
  globalThis.window.fetch = fetchWithHeaders;
}
const LoadFontsSSR = typeof (__vite_import_meta_env__) !== "undefined" && true ? LoadFonts : null;
function InternalErrorBoundary({
  error: errorArg
}) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);
  const shouldScale = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const scaleFactor = shouldScale ? 1.02 : 1;
  const copyButtonTextClass = shouldScale ? "text-sm" : "text-xs";
  const copyButtonPaddingClass = shouldScale ? "px-[10px] py-[5px]" : "px-[6px] py-[3px]";
  const postCountRef = useRef(0);
  const lastPostTimeRef = useRef(0);
  const lastErrorKeyRef = useRef(null);
  const MAX_ERROR_POSTS_PER_ERROR = 5;
  const THROTTLE_MS = 1e3;
  useEffect(() => {
    const serialized = serializeError(error);
    const errorKey = JSON.stringify(serialized);
    if (errorKey !== lastErrorKeyRef.current) {
      lastErrorKeyRef.current = errorKey;
      postCountRef.current = 0;
    }
    if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
      return;
    }
    const now = Date.now();
    const timeSinceLastPost = now - lastPostTimeRef.current;
    const post = () => {
      if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
        return;
      }
      postCountRef.current += 1;
      lastPostTimeRef.current = Date.now();
      window.parent.postMessage({
        type: "sandbox:error:detected",
        error: serialized
      }, "*");
    };
    if (timeSinceLastPost < THROTTLE_MS) {
      const timer = setTimeout(post, THROTTLE_MS - timeSinceLastPost);
      return () => clearTimeout(timer);
    }
    post();
  }, [error]);
  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const {
    buttonProps: copyButtonProps
  } = useButton({
    onPress: useCallback(() => {
      const toastScale = shouldScale ? 1.2 : 1;
      const toastStyle = {
        padding: `${16 * toastScale}px`,
        background: "#18191B",
        border: "1px solid #2C2D2F",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: `${280 * toastScale}px`,
        fontSize: `${13 * toastScale}px`,
        display: "flex",
        alignItems: "center",
        gap: `${6 * toastScale}px`,
        justifyContent: "flex-start",
        margin: "0 auto"
      };
      navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
      toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        style: toastStyle,
        renderId: "render-8d1b67e9",
        as: "div",
        children: [/* @__PURE__ */ jsxs("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          height: "20",
          width: "20",
          children: [/* @__PURE__ */ jsx("title", {
            children: "Success"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
            clipRule: "evenodd",
            renderId: "render-e88615f8",
            as: "path"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-ac403b35",
          as: "span",
          children: "Copied successfully!"
        })]
      }), {
        id: "copy-error-success",
        duration: 3e3
      });
    }, [error, shouldScale])
  }, useRef(null));
  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: !isInIframe() && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-md z-50 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
      style: {
        width: "75vw"
      },
      renderId: "render-1262d29c",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 shadow-lg w-full",
        style: scaleFactor !== 1 ? {
          transform: `scale(${scaleFactor})`,
          transformOrigin: "bottom center"
        } : void 0,
        renderId: "render-2e5a54cb",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-start gap-3",
          renderId: "render-810ea418",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex-shrink-0",
            renderId: "render-bd1173ed",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center",
              renderId: "render-77a00607",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-black text-[1.125rem] leading-none",
                renderId: "render-a6297f67",
                as: "span",
                children: "!"
              })
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-2 flex-1",
            renderId: "render-e686a157",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-col gap-1",
              renderId: "render-ec664260",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-light text-[#F2F2F2] text-sm",
                renderId: "render-fdb3f2e2",
                as: "p",
                children: "App Error Detected"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[#959697] text-sm font-light",
                renderId: "render-dcfea2e1",
                as: "p",
                children: "It looks like an error occurred while trying to use your app."
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white ${copyButtonTextClass} ${copyButtonPaddingClass} w-fit`,
              type: "button",
              ...copyButtonProps,
              renderId: "render-38fa18bc",
              as: "button",
              children: "Copy error"
            })]
          })]
        })
      })
    })
  });
}
class ErrorBoundaryWrapper extends Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(InternalErrorBoundary, {
        error: this.state.error,
        params: {}
      });
    }
    return this.props.children;
  }
}
function LoaderWrapper({
  loader
}) {
  return /* @__PURE__ */ jsx(Fragment, {
    children: loader()
  });
}
const ClientOnly = ({
  loader
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return /* @__PURE__ */ jsx(ErrorBoundaryWrapper, {
    children: /* @__PURE__ */ jsx(LoaderWrapper, {
      loader
    })
  });
};
function useHmrConnection() {
  const [connected, setConnected] = useState(() => false);
  useEffect(() => {
    return;
  }, []);
  return connected;
}
const healthyResponseType = "sandbox:web:healthcheck:response";
const useHandshakeParent = () => {
  const isHmrConnected = useHmrConnection();
  useEffect(() => {
    const healthyResponse = {
      type: healthyResponseType,
      healthy: isHmrConnected,
      supportsErrorDetected: true
    };
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:healthcheck") {
        window.parent.postMessage(healthyResponse, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(healthyResponse, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isHmrConnected]);
};
const waitForScreenshotReady = async () => {
  const images = Array.from(document.images);
  await Promise.all([
    // make sure custom fonts are loaded
    "fonts" in document ? document.fonts.ready : Promise.resolve(),
    ...images.map((img) => new Promise((resolve) => {
      img.crossOrigin = "anonymous";
      if (img.complete) {
        resolve(true);
        return;
      }
      img.onload = () => resolve(true);
      img.onerror = () => resolve(true);
    }))
  ]);
  await new Promise((resolve) => setTimeout(resolve, 250));
};
const useHandleScreenshotRequest = () => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data.type === "sandbox:web:screenshot:request") {
        try {
          await waitForScreenshotReady();
          const width = window.innerWidth;
          const aspectRatio = 16 / 9;
          const height = Math.floor(width / aspectRatio);
          const dataUrl = await toPng(document.body, {
            cacheBust: true,
            skipFonts: false,
            width,
            height,
            style: {
              // force snapshot sizing
              width: `${width}px`,
              height: `${height}px`,
              margin: "0"
            }
          });
          window.parent.postMessage({
            type: "sandbox:web:screenshot:response",
            dataUrl
          }, "*");
        } catch (error) {
          window.parent.postMessage({
            type: "sandbox:web:screenshot:error",
            error: error instanceof Error ? error.message : String(error)
          }, "*");
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
function Layout({
  children
}) {
  useHandshakeParent();
  useHandleScreenshotRequest();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:navigation") {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "sandbox:web:ready"
    }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({
        type: "sandbox:web:navigation",
        pathname
      }, "*");
    }
  }, [pathname]);
  const isAuthPage = pathname?.startsWith("/account");
  if (isAuthPage) {
    return /* @__PURE__ */ jsxs("html", {
      lang: "en",
      children: [/* @__PURE__ */ jsxs("head", {
        children: [/* @__PURE__ */ jsx("meta", {
          charSet: "utf-8"
        }), /* @__PURE__ */ jsx("meta", {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
          type: "module",
          src: "/src/__create/dev-error-overlay.js"
        }), /* @__PURE__ */ jsx("link", {
          rel: "icon",
          href: "/src/__create/favicon.png"
        }), LoadFontsSSR ? /* @__PURE__ */ jsx(LoadFontsSSR, {}) : null]
      }), /* @__PURE__ */ jsxs("body", {
        children: [/* @__PURE__ */ jsx(ClientOnly, {
          loader: () => children
        }), /* @__PURE__ */ jsx(Toaster, {
          position: isMobile ? "top-center" : "bottom-right"
        }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
          src: "https://kit.fontawesome.com/2c15cc0cc7.js",
          crossOrigin: "anonymous",
          async: true
        })]
      })]
    });
  }
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        type: "module",
        src: "/src/__create/dev-error-overlay.js"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/src/__create/favicon.png"
      }), LoadFontsSSR ? /* @__PURE__ */ jsx(LoadFontsSSR, {}) : null]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex min-h-screen bg-white",
        renderId: "render-e5fbe265",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "w-64 border-r border-gray-100 flex flex-col fixed inset-y-0",
          renderId: "render-7ad9cf56",
          as: "aside",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "p-6 flex flex-col items-center border-b border-gray-50",
            renderId: "render-699d233a",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              src: "/logo-pbd.png",
              alt: "Logo Papua Barat Daya",
              className: "w-20 h-20 mb-4 object-contain",
              onError: (e) => {
                e.currentTarget.src = "/src/__create/favicon.png";
              },
              renderId: "render-5e9e9156",
              as: "img"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-center",
              renderId: "render-1e44bcc4",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[12px] font-black text-[#2A2E45] leading-tight",
                renderId: "render-2d7d1944",
                as: "h2",
                children: "DINSOS & PPPA"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[12px] font-black text-[#2A2E45] leading-tight",
                renderId: "render-5119d673",
                as: "h2",
                children: "PAPUA BARAT DAYA"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[9px] text-[#8A8FA6] mt-1 font-bold uppercase tracking-widest",
                renderId: "render-d1ea558e",
                as: "p",
                children: "Sistem Pendataan Disabilitas"
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "mt-6 flex-1 px-4 space-y-2",
            renderId: "render-07625cff",
            as: "nav",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: () => navigate("/dashboard"),
              className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === "/dashboard" || pathname === "/" ? "bg-[#1570FF] text-white shadow-md shadow-blue-100" : "text-gray-500 hover:bg-gray-50"}`,
              renderId: "render-0dd467f0",
              as: "button",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "fa-solid fa-layer-group w-5",
                renderId: "render-e901bb79",
                as: "i"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-ce0ccbb5",
                as: "span",
                children: "Dashboard"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: () => navigate("/tambah-data"),
              className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === "/tambah-data" ? "bg-[#1570FF] text-white shadow-md shadow-blue-100" : "text-gray-500 hover:bg-gray-50"}`,
              renderId: "render-3f3ea31f",
              as: "button",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "fa-solid fa-user-plus w-5",
                renderId: "render-5345d11f",
                as: "i"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-984df908",
                as: "span",
                children: "Tambah Data"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: () => navigate("/daftar-data"),
              className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === "/daftar-data" ? "bg-[#1570FF] text-white shadow-md shadow-blue-100" : "text-gray-500 hover:bg-gray-50"}`,
              renderId: "render-e3a3be51",
              as: "button",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "fa-solid fa-file-lines w-5",
                renderId: "render-50356a5a",
                as: "i"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-6533c3e2",
                as: "span",
                children: "Daftar Data"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex-1 ml-64 bg-[#F7F9FC]",
          renderId: "render-f276f275",
          as: "main",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10",
            renderId: "render-f7fe1169",
            as: "header",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-lg font-bold text-gray-800",
              renderId: "render-ac085db3",
              as: "h1",
              children: pathname === "/dashboard" || pathname === "/" ? "Ringkasan Data" : pathname === "/tambah-data" ? "Pendaftaran Baru" : "Daftar Data"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center space-x-4",
              renderId: "render-625d81ee",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs font-medium text-gray-400",
                renderId: "render-14d3c977",
                as: "span",
                children: "Provinsi Papua Barat Daya"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400",
                renderId: "render-0838734e",
                as: "div",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "fa-solid fa-user",
                  renderId: "render-7418fc65",
                  as: "i"
                })
              })]
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "p-8",
            renderId: "render-9c18deeb",
            as: "div",
            children: /* @__PURE__ */ jsx(ClientOnly, {
              loader: () => children
            })
          })]
        })]
      }), /* @__PURE__ */ jsx(Toaster, {
        position: isMobile ? "top-center" : "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "https://kit.fontawesome.com/2c15cc0cc7.js",
        crossOrigin: "anonymous",
        async: true
      })]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(SessionProvider, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ClientOnly,
  Layout,
  default: root,
  links,
  useHandleScreenshotRequest,
  useHmrConnection
}, Symbol.toStringTag, { value: 'Module' }));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      // 5 minutes
      cacheTime: 1e3 * 60 * 30,
      // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
function RootLayout({
  children
}) {
  return /* @__PURE__ */ jsx(QueryClientProvider, {
    client: queryClient,
    children
  });
}

function HomePage() {
  useEffect(() => {
    window.location.href = "/dashboard";
  }, []);
  return null;
}

const page$d = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(HomePage, {
      ...props
    })
  });
});

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$d
}, Symbol.toStringTag, { value: 'Module' }));

function ErrorContent() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const getErrorMessage = (err) => {
    switch (err) {
      case "Configuration":
        return "Terjadi galat konfigurasi pada server.";
      case "AccessDenied":
        return "Akses ditolak. Anda tidak memiliki izin untuk masuk.";
      case "Verification":
        return "Tautan verifikasi telah kedaluwarsa atau sudah digunakan.";
      case "CredentialsSignin":
        return "Email atau password salah.";
      default:
        return "Terjadi kesalahan saat masuk. Silakan coba lagi.";
    }
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "flex min-h-screen w-full items-center justify-center bg-[#F7F9FC]",
    renderId: "render-6f839aae",
    as: "div",
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "w-full max-w-md rounded bg-white p-8 border border-[#E4E9F2] text-center",
      renderId: "render-73a15d5d",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-6",
        renderId: "render-835e4a29",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex justify-center mb-6",
          renderId: "render-112f5a01",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center",
            renderId: "render-c0e42bc3",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "fa-solid fa-circle-exclamation text-red-500 text-3xl",
              renderId: "render-87789077",
              as: "i"
            })
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl font-bold text-[#2A2E45] mb-2",
          renderId: "render-03b06c54",
          as: "h1",
          children: "Oops! Terjadi Kesalahan"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-sm text-red-500 bg-red-50 p-3 rounded mb-6",
          renderId: "render-eff15210",
          as: "p",
          children: getErrorMessage(error)
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-3",
          renderId: "render-afe591e5",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/account/signin",
            className: "block w-full h-10 leading-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6] transition-colors",
            renderId: "render-9f1ca4a6",
            as: "a",
            children: "Kembali ke Login"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-[#8A8FA6]",
            renderId: "render-ccc51da9",
            as: "p",
            children: "Jika masalah terus berlanjut, hubungi administrator sistem."
          })]
        })]
      })
    })
  });
}
function AuthErrorPage() {
  return /* @__PURE__ */ jsx(Suspense, {
    fallback: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      renderId: "render-6956e7c8",
      as: "div",
      children: "Loading..."
    }),
    children: /* @__PURE__ */ jsx(ErrorContent, {})
  });
}

const page$c = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AuthErrorPage, {
      ...props
    })
  });
});

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$c
}, Symbol.toStringTag, { value: 'Module' }));

function useAuth() {
  const callbackUrl = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('callbackUrl') : null;
  const signInWithCredentials = useCallback(options => {
    return signIn("credentials-signin", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  const signUpWithCredentials = useCallback(options => {
    return signIn("credentials-signup", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  const signInWithGoogle = useCallback(options => {
    return signIn("google", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  const signInWithFacebook = useCallback(options => {
    return signIn("facebook", options);
  }, []);
  const signInWithTwitter = useCallback(options => {
    return signIn("twitter", options);
  }, []);
  const signInWithApple = useCallback(options => {
    return signIn("apple", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  return {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithApple,
    signOut
  };
}

function LogoutPage() {
  const {
    signOut
  } = useAuth();
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/account/signin",
      redirect: true
    });
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "flex min-h-screen w-full items-center justify-center bg-[#F7F9FC]",
    renderId: "render-ecf0ca30",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "w-full max-w-md rounded bg-white p-8 border border-[#E4E9F2]",
      renderId: "render-760a87f3",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-6 text-center text-2xl font-bold text-[#2A2E45]",
        renderId: "render-56993f03",
        as: "h1",
        children: "Keluar"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        onClick: handleSignOut,
        className: "w-full h-10 rounded bg-[#1570FF] text-white text-sm font-semibold hover:bg-[#0F5FE6]",
        renderId: "render-f69293ee",
        as: "button",
        children: "Keluar dari Sistem"
      })]
    })
  });
}

const page$b = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(LogoutPage, {
      ...props
    })
  });
});

const route3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$b
}, Symbol.toStringTag, { value: 'Module' }));

function SignInPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    signInWithCredentials
  } = useAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!email || !password) {
      setError("Mohon isi semua kolom");
      setLoading(false);
      return;
    }
    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: true
      });
    } catch (err) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "flex min-h-screen w-full items-center justify-center bg-[#F7F9FC]",
    renderId: "render-6eecd604",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      noValidate: true,
      onSubmit,
      className: "w-full max-w-md rounded bg-white p-8 border border-[#E4E9F2]",
      renderId: "render-ae9f9452",
      as: "form",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-6 text-center",
        renderId: "render-686b5abc",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex justify-center mb-6",
          renderId: "render-9ea05f73",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: "/logo-pbd.png",
            alt: "Logo Papua Barat Daya",
            className: "w-24 h-24 object-contain",
            renderId: "render-669ea862",
            as: "img"
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl font-bold text-[#2A2E45] mb-2",
          renderId: "render-15894e61",
          as: "h1",
          children: "Masuk ke Sistem"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-sm text-[#8A8FA6]",
          renderId: "render-41a6c7fb",
          as: "p",
          children: "DINSOS & PPPA Papua Barat Daya"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "space-y-4",
        renderId: "render-736cfbfe",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-158ddf4b",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-sm font-medium text-[#2A2E45] mb-2",
            renderId: "render-b3aa36df",
            as: "label",
            children: "Email"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            required: true,
            name: "email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "Masukkan email Anda",
            className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
            renderId: "render-5e030167",
            as: "input"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-9d468d0c",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-sm font-medium text-[#2A2E45] mb-2",
            renderId: "render-e9922172",
            as: "label",
            children: "Password"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            required: true,
            name: "password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
            placeholder: "Masukkan password Anda",
            renderId: "render-468b1585",
            as: "input"
          })]
        }), error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "rounded bg-red-50 p-3 text-sm text-red-500",
          renderId: "render-2dd5e85c",
          as: "div",
          children: error
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          type: "submit",
          disabled: loading,
          className: "w-full h-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6] disabled:opacity-50",
          renderId: "render-d56c60d7",
          as: "button",
          children: loading ? "Memuat..." : "Masuk"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center text-sm text-[#8A8FA6]",
          renderId: "render-10758bb4",
          as: "p",
          children: ["Belum punya akun?", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/account/signup",
            className: "text-[#1570FF] hover:text-[#0F5FE6] font-semibold",
            renderId: "render-648ffab2",
            as: "a",
            children: "Daftar"
          })]
        })]
      })]
    })
  });
}

const page$a = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(SignInPage, {
      ...props
    })
  });
});

const route4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$a
}, Symbol.toStringTag, { value: 'Module' }));

function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    signUpWithCredentials
  } = useAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!email || !password || !confirmPassword) {
      setError("Mohon isi semua kolom");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setLoading(false);
      return;
    }
    try {
      await signUpWithCredentials({
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: true
      });
    } catch (err) {
      setError("Email sudah terdaftar atau terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "flex min-h-screen w-full items-center justify-center bg-[#F7F9FC]",
    renderId: "render-462bc59f",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      noValidate: true,
      onSubmit,
      className: "w-full max-w-md rounded bg-white p-8 border border-[#E4E9F2]",
      renderId: "render-6802fb1f",
      as: "form",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-6 text-center",
        renderId: "render-361af737",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex justify-center mb-6",
          renderId: "render-8bdb1498",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: "/logo-pbd.png",
            alt: "Logo Papua Barat Daya",
            className: "w-24 h-24 object-contain",
            renderId: "render-03204f80",
            as: "img"
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl font-bold text-[#2A2E45] mb-2",
          renderId: "render-617575ad",
          as: "h1",
          children: "Daftar Akun Baru"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-sm text-[#8A8FA6]",
          renderId: "render-6c686685",
          as: "p",
          children: "DINSOS & PPPA Papua Barat Daya"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "space-y-4",
        renderId: "render-8a7722bc",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-cdf48d88",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-sm font-medium text-[#2A2E45] mb-2",
            renderId: "render-a9b6b821",
            as: "label",
            children: "Email"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            required: true,
            name: "email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "Masukkan email Anda",
            className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
            renderId: "render-5836c611",
            as: "input"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-294d8514",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-sm font-medium text-[#2A2E45] mb-2",
            renderId: "render-ff0cda82",
            as: "label",
            children: "Password"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            required: true,
            name: "password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
            placeholder: "Minimal 6 karakter",
            renderId: "render-4a8357f5",
            as: "input"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-f205b8db",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-sm font-medium text-[#2A2E45] mb-2",
            renderId: "render-38a853f8",
            as: "label",
            children: "Konfirmasi Password"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            required: true,
            name: "confirmPassword",
            type: "password",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
            placeholder: "Ulangi password Anda",
            renderId: "render-6bd6135e",
            as: "input"
          })]
        }), error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "rounded bg-red-50 p-3 text-sm text-red-500",
          renderId: "render-9ba4fe82",
          as: "div",
          children: error
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          type: "submit",
          disabled: loading,
          className: "w-full h-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6] disabled:opacity-50",
          renderId: "render-965a5cfc",
          as: "button",
          children: loading ? "Memuat..." : "Daftar"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center text-sm text-[#8A8FA6]",
          renderId: "render-8c2404dc",
          as: "p",
          children: ["Sudah punya akun?", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/account/signin",
            className: "text-[#1570FF] hover:text-[#0F5FE6] font-semibold",
            renderId: "render-ce206763",
            as: "a",
            children: "Masuk"
          })]
        })]
      })]
    })
  });
}

const page$9 = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(SignUpPage, {
      ...props
    })
  });
});

const route5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$9
}, Symbol.toStringTag, { value: 'Module' }));

const useUser = () => {
  const {
    data: session,
    status
  } = useSession();
  const id = session?.user?.id;
  const [user, setUser] = React.useState(session?.user ?? null);
  const fetchUser = React.useCallback(async session => {
    return session?.user;
  }, []);
  const refetchUser = React.useCallback(() => {
    if (process.env.NEXT_PUBLIC_CREATE_ENV === "PRODUCTION") {
      if (id) {
        fetchUser(session).then(setUser);
      } else {
        setUser(null);
      }
    }
  }, [fetchUser, id]);
  React.useEffect(refetchUser, [refetchUser]);
  if (process.env.NEXT_PUBLIC_CREATE_ENV !== "PRODUCTION") {
    return {
      user,
      data: session?.user || null,
      loading: status === 'loading',
      refetch: refetchUser
    };
  }
  return {
    user,
    data: user,
    loading: status === 'loading' || status === 'authenticated' && !user,
    refetch: refetchUser
  };
};

function AdminContractorsPage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.id) {
        try {
          const res = await fetch("/api/user/role");
          if (res.ok) {
            const data = await res.json();
            if (data.role !== "admin") {
              window.location.href = "/";
            }
            setUserRole(data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchUserRole();
  }, [user]);
  useEffect(() => {
    const fetchContractors = async () => {
      if (userRole !== "admin") return;
      try {
        const params = new URLSearchParams();
        if (statusFilter !== "all") params.append("status", statusFilter);
        if (searchQuery) params.append("search", searchQuery);
        const res = await fetch(`/api/contractors?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setContractors(data.contractors);
        }
      } catch (error) {
        console.error("Error fetching contractors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContractors();
  }, [userRole, statusFilter, searchQuery]);
  const getStatusBadge = (status) => {
    const styles = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: Clock,
        label: "Pending"
      },
      approved: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: CheckCircle,
        label: "Approved"
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: XCircle,
        label: "Rejected"
      }
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;
    return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: `inline-flex items-center space-x-1 px-2 py-1 rounded border ${style.bg} ${style.border}`,
      renderId: "render-41f314c3",
      as: "div",
      children: [/* @__PURE__ */ jsx(Icon, {
        className: `w-3 h-3 ${style.text}`
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `text-xs font-medium ${style.text}`,
        renderId: "render-143012a6",
        as: "span",
        children: style.label
      })]
    });
  };
  if (userLoading || !userRole) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-283c3955",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-496ab205",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-0234cbac",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-b65aef2e",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto flex items-center space-x-4",
        renderId: "render-d7bbb13f",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/",
          className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
          renderId: "render-c30aa8ca",
          as: "button",
          children: /* @__PURE__ */ jsx(ArrowLeft, {
            className: "w-4 h-4 text-[#6F7689]"
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-3d39e3ca",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xl font-bold text-[#2A2E45]",
            renderId: "render-5c95dca5",
            as: "h1",
            children: "Daftar Kontraktor"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-b1cb4c33",
            as: "p",
            children: "Dinas Sosial dan PPPA Papua Barat Daya"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-7xl mx-auto p-6",
      renderId: "render-ab506930",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-4 mb-6",
        renderId: "render-5e83492b",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-cae6748c",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "relative",
            renderId: "render-92e9cd45",
            as: "div",
            children: [/* @__PURE__ */ jsx(Search, {
              className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8FA6]"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "text",
              placeholder: "Cari NIK, nama, atau perusahaan...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full h-10 pl-10 pr-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
              renderId: "render-750c5c1e",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "relative",
            renderId: "render-60ff1a09",
            as: "div",
            children: [/* @__PURE__ */ jsx(Filter, {
              className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8FA6]"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              value: statusFilter,
              onChange: (e) => setStatusFilter(e.target.value),
              className: "w-full h-10 pl-10 pr-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
              renderId: "render-09e9fc82",
              as: "select",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "all",
                renderId: "render-7ee6bd71",
                as: "option",
                children: "Semua Status"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "pending",
                renderId: "render-f01e19b7",
                as: "option",
                children: "Menunggu Verifikasi"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "approved",
                renderId: "render-ba727fc1",
                as: "option",
                children: "Terverifikasi"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "rejected",
                renderId: "render-8da8e751",
                as: "option",
                children: "Ditolak"
              })]
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded",
        renderId: "render-df43a283",
        as: "div",
        children: loading ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "p-8 text-center text-[#8A8FA6]",
          renderId: "render-444e6cd9",
          as: "div",
          children: "Memuat..."
        }) : contractors.length === 0 ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "p-8 text-center text-[#8A8FA6]",
          renderId: "render-0f873cfd",
          as: "div",
          children: "Tidak ada data kontraktor"
        }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "overflow-x-auto",
          renderId: "render-27f489ac",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "w-full",
            renderId: "render-cbbf860c",
            as: "table",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "bg-[#F7F9FC]",
              renderId: "render-12ed4667",
              as: "thead",
              children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-322ff416",
                as: "tr",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-1ffae80f",
                  as: "th",
                  children: "NIK"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-0df25f4e",
                  as: "th",
                  children: "Nama Lengkap"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-41e173c9",
                  as: "th",
                  children: "Perusahaan"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-f9fb77a1",
                  as: "th",
                  children: "Telepon"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-473ba228",
                  as: "th",
                  children: "Status"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-9f11b108",
                  as: "th",
                  children: "Tanggal Daftar"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-center text-xs font-semibold text-[#6F7689]",
                  renderId: "render-b98d31b1",
                  as: "th",
                  children: "Aksi"
                })]
              })
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "divide-y divide-[#E4E9F2]",
              renderId: "render-175e3b09",
              as: "tbody",
              children: contractors.map((contractor) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "hover:bg-[#FAFBFD]",
                renderId: "render-821789c8",
                as: "tr",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-sm text-[#2A2E45]",
                  renderId: "render-61bd32a8",
                  as: "td",
                  children: contractor.nik
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-sm text-[#2A2E45] font-medium",
                  renderId: "render-6a8644e8",
                  as: "td",
                  children: contractor.full_name
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-sm text-[#2A2E45]",
                  renderId: "render-8bfdc948",
                  as: "td",
                  children: contractor.company_name
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-sm text-[#2A2E45]",
                  renderId: "render-4fbee2c4",
                  as: "td",
                  children: contractor.phone
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3",
                  renderId: "render-1df6d70c",
                  as: "td",
                  children: getStatusBadge(contractor.status)
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-sm text-[#8A8FA6]",
                  renderId: "render-206ecf5e",
                  as: "td",
                  children: new Date(contractor.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-center",
                  renderId: "render-8392f5be",
                  as: "td",
                  children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    onClick: () => window.location.href = `/admin/contractors/${contractor.id}`,
                    className: "inline-flex items-center space-x-1 px-3 py-1 bg-[#EDF3FF] text-[#1570FF] rounded text-xs font-semibold hover:bg-[#DBEAFE]",
                    renderId: "render-d2294ef0",
                    as: "button",
                    children: [/* @__PURE__ */ jsx(Eye, {
                      className: "w-3 h-3"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      renderId: "render-59aff6ed",
                      as: "span",
                      children: "Lihat"
                    })]
                  })
                })]
              }, contractor.id))
            })]
          })
        })
      })]
    })]
  });
}

const page$8 = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AdminContractorsPage, {
      ...props
    })
  });
});

const route6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$8
}, Symbol.toStringTag, { value: 'Module' }));

function AdminContractorDetailPage({
  params
}) {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.id) {
        try {
          const res = await fetch("/api/user/role");
          if (res.ok) {
            const data = await res.json();
            if (data.role !== "admin") {
              window.location.href = "/";
            }
            setUserRole(data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchUserRole();
  }, [user]);
  useEffect(() => {
    const fetchContractor = async () => {
      if (!userRole) return;
      try {
        const res = await fetch(`/api/contractors/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setContractor(data.contractor);
        }
      } catch (error) {
        console.error("Error fetching contractor:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userRole === "admin") {
      fetchContractor();
    }
  }, [userRole, params.id]);
  const handleApprove = async () => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/contractors/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contractor_id: contractor.id,
          status: "approved"
        })
      });
      if (res.ok) {
        const data = await res.json();
        setContractor(data.contractor);
      }
    } catch (error) {
      console.error("Error approving contractor:", error);
    } finally {
      setActionLoading(false);
    }
  };
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Mohon isi alasan penolakan");
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch("/api/contractors/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contractor_id: contractor.id,
          status: "rejected",
          rejection_reason: rejectionReason
        })
      });
      if (res.ok) {
        const data = await res.json();
        setContractor(data.contractor);
        setShowRejectModal(false);
        setRejectionReason("");
      }
    } catch (error) {
      console.error("Error rejecting contractor:", error);
    } finally {
      setActionLoading(false);
    }
  };
  if (userLoading || loading || !userRole) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-be7715d6",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-9ce97230",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  if (!contractor) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-38d9042c",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-6d5ef0af",
        as: "div",
        children: "Kontraktor tidak ditemukan"
      })
    });
  }
  const getStatusBadge = (status) => {
    const styles = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: Clock,
        label: "Menunggu Verifikasi"
      },
      approved: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: CheckCircle,
        label: "Terverifikasi"
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: XCircle,
        label: "Ditolak"
      }
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;
    return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: `inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${style.bg} ${style.border}`,
      renderId: "render-e5214c61",
      as: "div",
      children: [/* @__PURE__ */ jsx(Icon, {
        className: `w-4 h-4 ${style.text}`
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `text-sm font-medium ${style.text}`,
        renderId: "render-eaa94786",
        as: "span",
        children: style.label
      })]
    });
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-0e362c1f",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-b260db6f",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "max-w-4xl mx-auto flex items-center justify-between",
        renderId: "render-8546bf38",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-4",
          renderId: "render-7a98d469",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/admin/contractors",
            className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
            renderId: "render-23726cea",
            as: "button",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 text-[#6F7689]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-54083f64",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#2A2E45]",
              renderId: "render-a47abb84",
              as: "h1",
              children: "Detail Kontraktor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-27981aa8",
              as: "p",
              children: contractor.full_name
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-4xl mx-auto p-6 space-y-6",
      renderId: "render-0fe61d8f",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-bb5225cc",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between mb-4",
          renderId: "render-6328e9ea",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-d99ef761",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-lg font-semibold text-[#2A2E45] mb-2",
              renderId: "render-417fe4dd",
              as: "h2",
              children: "Status Verifikasi"
            }), getStatusBadge(contractor.status)]
          }), contractor.status === "pending" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex space-x-3",
            renderId: "render-fc8c40d7",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: handleApprove,
              disabled: actionLoading,
              className: "px-4 h-9 bg-green-600 text-white rounded text-sm font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2",
              renderId: "render-d896e7ee",
              as: "button",
              children: [/* @__PURE__ */ jsx(CheckCircle, {
                className: "w-4 h-4"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-5d9350ab",
                as: "span",
                children: "Setujui"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: () => setShowRejectModal(true),
              disabled: actionLoading,
              className: "px-4 h-9 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center space-x-2",
              renderId: "render-e15f8291",
              as: "button",
              children: [/* @__PURE__ */ jsx(XCircle, {
                className: "w-4 h-4"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-331889c9",
                as: "span",
                children: "Tolak"
              })]
            })]
          })]
        }), contractor.status === "rejected" && contractor.rejection_reason && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-red-50 border border-red-200 rounded p-4",
          renderId: "render-051080c6",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-red-900 mb-1",
            renderId: "render-eb3fbcfa",
            as: "p",
            children: "Alasan Penolakan:"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-red-800",
            renderId: "render-d8980392",
            as: "p",
            children: contractor.rejection_reason
          })]
        }), contractor.status === "approved" && contractor.verified_at && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-green-50 border border-green-200 rounded p-4",
          renderId: "render-88aa7cdc",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm text-green-800",
            renderId: "render-92b288cd",
            as: "p",
            children: ["Diverifikasi pada:", " ", new Date(contractor.verified_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-a603b8a0",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-2 mb-4",
          renderId: "render-15ccc2fc",
          as: "div",
          children: [/* @__PURE__ */ jsx(User, {
            className: "w-5 h-5 text-[#1570FF]"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45]",
            renderId: "render-a05a0188",
            as: "h2",
            children: "Data Pribadi"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-ad111c33",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-0b3c60c6",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-e775260c",
              as: "label",
              children: "NIK"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45] font-medium",
              renderId: "render-ee6bff23",
              as: "p",
              children: contractor.nik
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-da5160ef",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-958e2373",
              as: "label",
              children: "Nama Lengkap"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45] font-medium",
              renderId: "render-d8d21cca",
              as: "p",
              children: contractor.full_name
            })]
          }), contractor.birth_place && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-5b05f54d",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-60fed1ae",
              as: "label",
              children: "Tempat Lahir"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-4fd6d2d4",
              as: "p",
              children: contractor.birth_place
            })]
          }), contractor.birth_date && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-a6a9b376",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-ecf02370",
              as: "label",
              children: "Tanggal Lahir"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-983027d7",
              as: "p",
              children: new Date(contractor.birth_date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-fb9ce1de",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-1a6d7797",
              as: "label",
              children: "No. Telepon"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-688d9468",
              as: "p",
              children: contractor.phone
            })]
          }), contractor.email && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-8b4f9d26",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-9f9ce77e",
              as: "label",
              children: "Email"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-2eec6937",
              as: "p",
              children: contractor.email
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-a811f4f2",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-077d3f3d",
              as: "label",
              children: "Alamat"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-e4417a5f",
              as: "p",
              children: contractor.address
            })]
          }), contractor.city && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-f83bd01f",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-b2e01560",
              as: "label",
              children: "Kota/Kabupaten"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-9d9c6e02",
              as: "p",
              children: contractor.city
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-c865a141",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-9531c04f",
              as: "label",
              children: "Provinsi"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-9f991c5f",
              as: "p",
              children: contractor.province
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-b6c65c0e",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-2 mb-4",
          renderId: "render-20abb670",
          as: "div",
          children: [/* @__PURE__ */ jsx(Building, {
            className: "w-5 h-5 text-[#1570FF]"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45]",
            renderId: "render-dee714ff",
            as: "h2",
            children: "Data Perusahaan"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-09713dbe",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-a442ede0",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-b5f4355c",
              as: "label",
              children: "Nama Perusahaan"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45] font-medium",
              renderId: "render-7d511cae",
              as: "p",
              children: contractor.company_name
            })]
          }), contractor.company_type && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-a1749ce9",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-747dd1eb",
              as: "label",
              children: "Jenis Perusahaan"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-79976a05",
              as: "p",
              children: contractor.company_type
            })]
          }), contractor.npwp && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-f9bc1069",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-d10b6723",
              as: "label",
              children: "NPWP"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-e51e38f2",
              as: "p",
              children: contractor.npwp
            })]
          }), contractor.company_address && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-df217f47",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-aab5cf3d",
              as: "label",
              children: "Alamat Kantor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-bb98a0cf",
              as: "p",
              children: contractor.company_address
            })]
          }), contractor.company_phone && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-1fb4ce9c",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-3c857dec",
              as: "label",
              children: "Telepon Kantor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-20237b3f",
              as: "p",
              children: contractor.company_phone
            })]
          }), contractor.establishment_year && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-505c5583",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-ba41128c",
              as: "label",
              children: "Tahun Berdiri"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-1bfa7c99",
              as: "p",
              children: contractor.establishment_year
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-5fd1d8e1",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-semibold text-[#2A2E45] mb-4",
          renderId: "render-981730b4",
          as: "h2",
          children: "Klasifikasi & Bidang Usaha"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-4",
          renderId: "render-f78ec10c",
          as: "div",
          children: [(contractor.small_classification || contractor.medium_classification || contractor.large_classification) && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-fd1d4e12",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-2",
              renderId: "render-14284382",
              as: "label",
              children: "Klasifikasi"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2",
              renderId: "render-8166cc8e",
              as: "div",
              children: [contractor.small_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200",
                renderId: "render-6ee3d8ff",
                as: "span",
                children: ["Kecil: ", contractor.small_classification]
              }), contractor.medium_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200",
                renderId: "render-7549d6b5",
                as: "span",
                children: ["Menengah: ", contractor.medium_classification]
              }), contractor.large_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-200",
                renderId: "render-4e5f8539",
                as: "span",
                children: ["Besar: ", contractor.large_classification]
              })]
            })]
          }), contractor.business_field && contractor.business_field.length > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-1d36a5ea",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-2",
              renderId: "render-e30b847e",
              as: "label",
              children: "Bidang Usaha"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2",
              renderId: "render-d769d323",
              as: "div",
              children: contractor.business_field.map((field, index) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-[#EDF3FF] text-[#1570FF] text-sm rounded-full border border-[#BFDBFE]",
                renderId: "render-91c5589b",
                as: "span",
                children: field
              }, index))
            })]
          })]
        })]
      })]
    }), showRejectModal && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
      renderId: "render-7a24de4f",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white rounded max-w-md w-full p-6",
        renderId: "render-615d4d1b",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-semibold text-[#2A2E45] mb-4",
          renderId: "render-cccdf470",
          as: "h3",
          children: "Tolak Pendaftaran"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "mb-4",
          renderId: "render-e36d448c",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "block text-sm font-medium text-[#2A2E45] mb-2",
            renderId: "render-baa05688",
            as: "label",
            children: ["Alasan Penolakan ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-red-500",
              renderId: "render-5eeffec2",
              as: "span",
              children: "*"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            value: rejectionReason,
            onChange: (e) => setRejectionReason(e.target.value),
            rows: 4,
            className: "w-full px-3 py-2 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
            placeholder: "Masukkan alasan penolakan...",
            renderId: "render-058e196a",
            as: "textarea"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex justify-end space-x-3",
          renderId: "render-8fe47353",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => {
              setShowRejectModal(false);
              setRejectionReason("");
            },
            className: "px-4 h-9 bg-white border border-[#E4E9F2] text-[#2A2E45] rounded text-sm font-semibold hover:bg-[#F7F9FC]",
            renderId: "render-f522e0c9",
            as: "button",
            children: "Batal"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: handleReject,
            disabled: actionLoading || !rejectionReason.trim(),
            className: "px-4 h-9 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700 disabled:opacity-50",
            renderId: "render-cbd76f7a",
            as: "button",
            children: actionLoading ? "Memproses..." : "Tolak"
          })]
        })]
      })
    })]
  });
}

const page$7 = withComponentProps(function WrappedPage(props) {
  const params = useParams$1();
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AdminContractorDetailPage, {
      ...props,
      id: params.id
    })
  });
});

const route7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$7
}, Symbol.toStringTag, { value: 'Module' }));

function AdminDashboardPage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.id) {
        try {
          const res = await fetch("/api/user/role");
          if (res.ok) {
            const data = await res.json();
            if (data.role !== "admin") {
              window.location.href = "/";
            }
            setUserRole(data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchUserRole();
  }, [user]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userRole === "admin") {
      fetchStats();
    }
  }, [userRole]);
  if (userLoading || loading || !userRole) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-28b89fc7",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-9a703447",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-7565cd13",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-3ccc6bfe",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto flex items-center space-x-4",
        renderId: "render-50077c93",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/",
          className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
          renderId: "render-374b3004",
          as: "button",
          children: /* @__PURE__ */ jsx(ArrowLeft, {
            className: "w-4 h-4 text-[#6F7689]"
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-b26abb15",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xl font-bold text-[#2A2E45]",
            renderId: "render-97da4e76",
            as: "h1",
            children: "Dashboard Admin"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-f67530c8",
            as: "p",
            children: "Dinas Sosial dan PPPA Papua Barat Daya"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-7xl mx-auto p-6",
      renderId: "render-8effcb5c",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
        renderId: "render-4ec74354",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-7153ec95",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center justify-between mb-2",
            renderId: "render-bd387dc8",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center",
              renderId: "render-99bdcfce",
              as: "div",
              children: /* @__PURE__ */ jsx(Users, {
                className: "w-5 h-5 text-blue-600"
              })
            }), /* @__PURE__ */ jsx(TrendingUp, {
              className: "w-4 h-4 text-green-500"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-[#2A2E45] mb-1",
            renderId: "render-7f0d5b70",
            as: "div",
            children: stats?.stats?.total || 0
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-ef43140c",
            as: "div",
            children: "Total Kontraktor"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-e302c169",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex items-center justify-between mb-2",
            renderId: "render-9f128b78",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-10 h-10 bg-green-50 rounded-full flex items-center justify-center",
              renderId: "render-71519a61",
              as: "div",
              children: /* @__PURE__ */ jsx(CheckCircle, {
                className: "w-5 h-5 text-green-600"
              })
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-[#2A2E45] mb-1",
            renderId: "render-db1609f6",
            as: "div",
            children: stats?.stats?.approved || 0
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-3e440098",
            as: "div",
            children: "Terverifikasi"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-2ff3e135",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex items-center justify-between mb-2",
            renderId: "render-dd756294",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center",
              renderId: "render-a6f6e6a2",
              as: "div",
              children: /* @__PURE__ */ jsx(Clock, {
                className: "w-5 h-5 text-yellow-600"
              })
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-[#2A2E45] mb-1",
            renderId: "render-11248e9b",
            as: "div",
            children: stats?.stats?.pending || 0
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-4e1f2d75",
            as: "div",
            children: "Menunggu Verifikasi"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-9505c33c",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex items-center justify-between mb-2",
            renderId: "render-bb5f9f9c",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-10 h-10 bg-red-50 rounded-full flex items-center justify-center",
              renderId: "render-31f3d90a",
              as: "div",
              children: /* @__PURE__ */ jsx(XCircle, {
                className: "w-5 h-5 text-red-600"
              })
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-[#2A2E45] mb-1",
            renderId: "render-ffa2356d",
            as: "div",
            children: stats?.stats?.rejected || 0
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-7037007c",
            as: "div",
            children: "Ditolak"
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-1d60b4e9",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between mb-4",
          renderId: "render-e2e79ab3",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45]",
            renderId: "render-abfa632f",
            as: "h2",
            children: "Pendaftaran Terbaru"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/admin/contractors",
            className: "text-sm text-[#1570FF] hover:text-[#0F5FE6] font-semibold",
            renderId: "render-e7500905",
            as: "button",
            children: "Lihat Semua →"
          })]
        }), stats?.recentSubmissions && stats.recentSubmissions.length > 0 ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "space-y-3",
          renderId: "render-03bc798c",
          as: "div",
          children: stats.recentSubmissions.map((contractor) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center justify-between p-4 bg-[#FAFBFD] rounded border border-[#E4E9F2] hover:bg-[#F7F9FC] cursor-pointer transition-colors",
            onClick: () => window.location.href = `/admin/contractors/${contractor.id}`,
            renderId: "render-4bb53c50",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex-1",
              renderId: "render-7512f46f",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-semibold text-[#2A2E45] mb-1",
                renderId: "render-ec66bf84",
                as: "h3",
                children: contractor.full_name
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-[#8A8FA6]",
                renderId: "render-52742b9a",
                as: "p",
                children: contractor.company_name
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center space-x-3",
              renderId: "render-4023f31f",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-right mr-4",
                renderId: "render-ca371fbc",
                as: "div",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xs text-[#8A8FA6]",
                  renderId: "render-f72958c5",
                  as: "p",
                  children: new Date(contractor.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })
                })
              }), contractor.status === "pending" && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded border border-yellow-200",
                renderId: "render-47f5390f",
                as: "span",
                children: "Pending"
              }), contractor.status === "approved" && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200",
                renderId: "render-0bd3254d",
                as: "span",
                children: "Approved"
              }), contractor.status === "rejected" && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-2 py-1 bg-red-50 text-red-700 text-xs rounded border border-red-200",
                renderId: "render-50e46120",
                as: "span",
                children: "Rejected"
              })]
            })]
          }, contractor.id))
        }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-center py-8 text-[#8A8FA6]",
          renderId: "render-7958bad3",
          as: "div",
          children: "Belum ada pendaftaran"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-6",
        renderId: "render-eb30aeb6",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/admin/contractors?status=pending",
          className: "bg-white border border-[#E4E9F2] rounded p-6 hover:bg-[#FAFBFD] text-left transition-colors",
          renderId: "render-1926653a",
          as: "button",
          children: [/* @__PURE__ */ jsx(Clock, {
            className: "w-8 h-8 text-yellow-600 mb-3"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45] mb-2",
            renderId: "render-48e14a21",
            as: "h3",
            children: "Verifikasi Kontraktor"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-0cac7a3e",
            as: "p",
            children: ["Tinjau dan verifikasi ", stats?.stats?.pending || 0, " kontraktor yang menunggu"]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/admin/contractors",
          className: "bg-white border border-[#E4E9F2] rounded p-6 hover:bg-[#FAFBFD] text-left transition-colors",
          renderId: "render-e4a8baa4",
          as: "button",
          children: [/* @__PURE__ */ jsx(Users, {
            className: "w-8 h-8 text-[#1570FF] mb-3"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45] mb-2",
            renderId: "render-1c785a15",
            as: "h3",
            children: "Kelola Kontraktor"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-dbec4be7",
            as: "p",
            children: "Lihat dan kelola semua data kontraktor terdaftar"
          })]
        })]
      })]
    })]
  });
}

const page$6 = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AdminDashboardPage, {
      ...props
    })
  });
});

const route8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$6
}, Symbol.toStringTag, { value: 'Module' }));

function MakeAdminPage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const handleMakeAdmin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/make-admin", {
        method: "POST"
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Terjadi kesalahan");
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 2e3);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  if (userLoading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-63d449f0",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-bf44693a",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  if (!user) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-b0e3e432",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-4fbf9480",
        as: "div",
        children: "Silakan login terlebih dahulu"
      })
    });
  }
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "flex min-h-screen items-center justify-center bg-[#F7F9FC] p-4",
    renderId: "render-db8127a7",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "w-full max-w-md",
      renderId: "render-c22ff2ef",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-8",
        renderId: "render-38812fcc",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex justify-center mb-6",
          renderId: "render-a910a6b1",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-16 h-16 bg-[#EDF3FF] rounded-full flex items-center justify-center",
            renderId: "render-39287817",
            as: "div",
            children: /* @__PURE__ */ jsx(Shield, {
              className: "w-8 h-8 text-[#1570FF]"
            })
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl font-bold text-[#2A2E45] text-center mb-2",
          renderId: "render-c6ddba26",
          as: "h1",
          children: "Buat Admin Pertama"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-sm text-[#8A8FA6] text-center mb-6",
          renderId: "render-689f6fef",
          as: "p",
          children: ["Akun: ", user.email]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-yellow-50 border border-yellow-200 rounded p-4 mb-6",
          renderId: "render-fef8f75a",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start space-x-3",
            renderId: "render-5eaf0fd2",
            as: "div",
            children: [/* @__PURE__ */ jsx(AlertTriangle, {
              className: "w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-8a33dead",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-semibold text-yellow-900 mb-1",
                renderId: "render-2e61f8b3",
                as: "p",
                children: "Peringatan Penting!"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-sm text-yellow-800 space-y-1",
                renderId: "render-6db332c7",
                as: "ul",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-46d44222",
                  as: "li",
                  children: "• Halaman ini harus DIHAPUS setelah admin pertama dibuat"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-7259fea6",
                  as: "li",
                  children: "• Siapapun yang mengakses halaman ini dapat menjadi admin"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-d2d42841",
                  as: "li",
                  children: "• Gunakan hanya untuk setup awal aplikasi"
                })]
              })]
            })]
          })
        }), success && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-green-50 border border-green-200 rounded p-4 mb-4",
          renderId: "render-5686f651",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-green-800 text-center",
            renderId: "render-8f8488ae",
            as: "p",
            children: "✓ Akun berhasil dijadikan admin! Mengalihkan..."
          })
        }), error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-red-50 border border-red-200 rounded p-4 mb-4",
          renderId: "render-b02cf1f8",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-red-800 text-center",
            renderId: "render-cd28aa75",
            as: "p",
            children: error
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: handleMakeAdmin,
          disabled: loading || success,
          className: "w-full h-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6] disabled:opacity-50",
          renderId: "render-b5e8300d",
          as: "button",
          children: loading ? "Memproses..." : "Jadikan Admin"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/",
          className: "w-full h-10 mt-3 bg-white border border-[#E4E9F2] text-[#2A2E45] rounded text-sm font-semibold hover:bg-[#F7F9FC]",
          renderId: "render-9f92b6bc",
          as: "button",
          children: "Kembali ke Beranda"
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-4 bg-red-50 border border-red-200 rounded p-4",
        renderId: "render-4be37ad8",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-xs text-red-800 text-center",
          renderId: "render-5cc85ecd",
          as: "p",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-d6aedac6",
            as: "strong",
            children: "JANGAN LUPA:"
          }), " Hapus file /apps/web/src/app/admin/make-first-admin/page.jsx setelah admin pertama dibuat!"]
        })
      })]
    })
  });
}

const page$5 = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(MakeAdminPage, {
      ...props
    })
  });
});

const route9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$5
}, Symbol.toStringTag, { value: 'Module' }));

function ContractorProfilePage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/contractors/my-profile");
        if (res.ok) {
          const data = await res.json();
          setContractor(data.contractor);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchProfile();
    }
  }, [user]);
  if (userLoading || loading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-1be4ae22",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-e74cc962",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  const getStatusBadge = (status) => {
    const styles = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: Clock
      },
      approved: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: CheckCircle
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: XCircle
      }
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;
    const labels = {
      pending: "Menunggu Verifikasi",
      approved: "Terverifikasi",
      rejected: "Ditolak"
    };
    return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: `inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${style.bg} ${style.border}`,
      renderId: "render-e17c51ac",
      as: "div",
      children: [/* @__PURE__ */ jsx(Icon, {
        className: `w-4 h-4 ${style.text}`
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `text-sm font-medium ${style.text}`,
        renderId: "render-2cf1ab30",
        as: "span",
        children: labels[status]
      })]
    });
  };
  if (!contractor) {
    return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "min-h-screen bg-[#F7F9FC]",
      renderId: "render-4691a413",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
        renderId: "render-d2725d26",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-4xl mx-auto flex items-center space-x-4",
          renderId: "render-437e2c0f",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/",
            className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
            renderId: "render-e5feb4e3",
            as: "button",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 text-[#6F7689]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-5265064f",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#2A2E45]",
              renderId: "render-a3dddd24",
              as: "h1",
              children: "Profil Kontraktor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-d7f84f6c",
              as: "p",
              children: "Dinas Sosial dan PPPA Papua Barat Daya"
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "max-w-4xl mx-auto p-6",
        renderId: "render-a39972c3",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-12 text-center",
          renderId: "render-1097163b",
          as: "div",
          children: [/* @__PURE__ */ jsx(FileText, {
            className: "w-16 h-16 text-[#8A8FA6] mx-auto mb-4"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xl font-semibold text-[#2A2E45] mb-2",
            renderId: "render-77460e38",
            as: "h2",
            children: "Anda Belum Terdaftar"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-[#8A8FA6] mb-6",
            renderId: "render-da0a09f1",
            as: "p",
            children: "Silakan lengkapi data kontraktor Anda terlebih dahulu"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/contractor/register",
            className: "px-6 h-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6]",
            renderId: "render-9e480e95",
            as: "button",
            children: "Daftar Sekarang"
          })]
        })
      })]
    });
  }
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-37c179ad",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-8f79e0d9",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-4xl mx-auto flex items-center justify-between",
        renderId: "render-a74452f4",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-4",
          renderId: "render-0cba7e74",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/",
            className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
            renderId: "render-8798718b",
            as: "button",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 text-[#6F7689]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-22a7818c",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#2A2E45]",
              renderId: "render-dc606cb9",
              as: "h1",
              children: "Profil Kontraktor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-fb060247",
              as: "p",
              children: "Dinas Sosial dan PPPA Papua Barat Daya"
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/contractor/register",
          className: "px-4 h-9 bg-white border border-[#E4E9F2] text-[#2A2E45] rounded text-sm font-semibold hover:bg-[#F7F9FC] flex items-center space-x-2",
          renderId: "render-471d0279",
          as: "button",
          children: [/* @__PURE__ */ jsx(Edit, {
            className: "w-4 h-4"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-b993913a",
            as: "span",
            children: "Edit Data"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-4xl mx-auto p-6 space-y-6",
      renderId: "render-9560d31a",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-1d213da5",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between mb-4",
          renderId: "render-90ea9e94",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45]",
            renderId: "render-63e10dd2",
            as: "h2",
            children: "Status Verifikasi"
          }), getStatusBadge(contractor.status)]
        }), contractor.status === "rejected" && contractor.rejection_reason && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-red-50 border border-red-200 rounded p-4",
          renderId: "render-58e90475",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-red-900 mb-1",
            renderId: "render-d7e910c4",
            as: "p",
            children: "Alasan Penolakan:"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-red-800",
            renderId: "render-beb39d9e",
            as: "p",
            children: contractor.rejection_reason
          })]
        }), contractor.status === "approved" && contractor.verified_at && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-green-50 border border-green-200 rounded p-4",
          renderId: "render-46f2247f",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm text-green-800",
            renderId: "render-b1787e13",
            as: "p",
            children: ["Diverifikasi pada:", " ", new Date(contractor.verified_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-2acd2a16",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-semibold text-[#2A2E45] mb-4",
          renderId: "render-7c00e802",
          as: "h2",
          children: "Data Pribadi"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-38567025",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-47c00380",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-d9ee13fd",
              as: "label",
              children: "NIK"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-3bd0186b",
              as: "p",
              children: contractor.nik
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-9b1a8d33",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-f3747d39",
              as: "label",
              children: "Nama Lengkap"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-a9387bd6",
              as: "p",
              children: contractor.full_name
            })]
          }), contractor.birth_place && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-53004132",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-8abadd65",
              as: "label",
              children: "Tempat Lahir"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-5e85776d",
              as: "p",
              children: contractor.birth_place
            })]
          }), contractor.birth_date && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-23417d8e",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-20796d97",
              as: "label",
              children: "Tanggal Lahir"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-a90aeae3",
              as: "p",
              children: new Date(contractor.birth_date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-1802cf0d",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-1dfc1215",
              as: "label",
              children: "No. Telepon"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-08864ce5",
              as: "p",
              children: contractor.phone
            })]
          }), contractor.email && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-ade9505a",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-432dc631",
              as: "label",
              children: "Email"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-254f1a72",
              as: "p",
              children: contractor.email
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-7fe9d5be",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-51795e75",
              as: "label",
              children: "Alamat"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-b3a115a0",
              as: "p",
              children: contractor.address
            })]
          }), contractor.city && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-b6809c48",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-c1dadb51",
              as: "label",
              children: "Kota/Kabupaten"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-a6de5401",
              as: "p",
              children: contractor.city
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-37e91266",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-de202f8c",
              as: "label",
              children: "Provinsi"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-46b04bfa",
              as: "p",
              children: contractor.province
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-23fabbd0",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-semibold text-[#2A2E45] mb-4",
          renderId: "render-b8ce90ae",
          as: "h2",
          children: "Data Perusahaan"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-1df5fef2",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-55877edd",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-2d65361e",
              as: "label",
              children: "Nama Perusahaan"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-4a399544",
              as: "p",
              children: contractor.company_name
            })]
          }), contractor.company_type && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-b6973862",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-41d3fdda",
              as: "label",
              children: "Jenis Perusahaan"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-dbf233f4",
              as: "p",
              children: contractor.company_type
            })]
          }), contractor.npwp && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-e192c0dd",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-a5b94b47",
              as: "label",
              children: "NPWP"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-320f2ee5",
              as: "p",
              children: contractor.npwp
            })]
          }), contractor.company_address && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-c7024b00",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-186caaf8",
              as: "label",
              children: "Alamat Kantor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-9ff9130e",
              as: "p",
              children: contractor.company_address
            })]
          }), contractor.company_phone && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-cb4c7b3a",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-c67e3160",
              as: "label",
              children: "Telepon Kantor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-e696bcbf",
              as: "p",
              children: contractor.company_phone
            })]
          }), contractor.establishment_year && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-a7990361",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-81635077",
              as: "label",
              children: "Tahun Berdiri"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-e2deba10",
              as: "p",
              children: contractor.establishment_year
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-a235dd01",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-semibold text-[#2A2E45] mb-4",
          renderId: "render-01367005",
          as: "h2",
          children: "Klasifikasi & Bidang Usaha"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-4",
          renderId: "render-1d7012a6",
          as: "div",
          children: [(contractor.small_classification || contractor.medium_classification || contractor.large_classification) && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-9d599241",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-2",
              renderId: "render-0a50cf26",
              as: "label",
              children: "Klasifikasi"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2",
              renderId: "render-d76ca55b",
              as: "div",
              children: [contractor.small_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200",
                renderId: "render-d02a99ed",
                as: "span",
                children: ["Kecil: ", contractor.small_classification]
              }), contractor.medium_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200",
                renderId: "render-7e64dfcd",
                as: "span",
                children: ["Menengah: ", contractor.medium_classification]
              }), contractor.large_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-200",
                renderId: "render-676950c4",
                as: "span",
                children: ["Besar: ", contractor.large_classification]
              })]
            })]
          }), contractor.business_field && contractor.business_field.length > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-a9e2e4f9",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-2",
              renderId: "render-538a2cee",
              as: "label",
              children: "Bidang Usaha"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2",
              renderId: "render-ae78bcd2",
              as: "div",
              children: contractor.business_field.map((field, index) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-[#EDF3FF] text-[#1570FF] text-sm rounded-full border border-[#BFDBFE]",
                renderId: "render-3b1dfcc5",
                as: "span",
                children: field
              }, index))
            })]
          })]
        })]
      })]
    })]
  });
}

const page$4 = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ContractorProfilePage, {
      ...props
    })
  });
});

const route10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$4
}, Symbol.toStringTag, { value: 'Module' }));

function useUpload() {
  const [loading, setLoading] = React.useState(false);
  const upload = React.useCallback(async input => {
    try {
      setLoading(true);
      let response;
      if ("file" in input && input.file) {
        const formData = new FormData();
        formData.append("file", input.file);
        response = await fetch("/_create/api/upload/", {
          method: "POST",
          body: formData
        });
      } else if ("url" in input) {
        response = await fetch("/_create/api/upload/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            url: input.url
          })
        });
      } else if ("base64" in input) {
        response = await fetch("/_create/api/upload/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            base64: input.base64
          })
        });
      } else {
        response = await fetch("/_create/api/upload/", {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream"
          },
          body: input.buffer
        });
      }
      if (!response.ok) {
        if (response.status === 413) {
          throw new Error("Upload failed: File too large.");
        }
        throw new Error("Upload failed");
      }
      const data = await response.json();
      return {
        url: data.url,
        mimeType: data.mimeType || null
      };
    } catch (uploadError) {
      if (uploadError instanceof Error) {
        return {
          error: uploadError.message
        };
      }
      if (typeof uploadError === "string") {
        return {
          error: uploadError
        };
      }
      return {
        error: "Upload failed"
      };
    } finally {
      setLoading(false);
    }
  }, []);
  return [upload, {
    loading
  }];
}

function ContractorRegisterPage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [upload, {
    loading: uploadLoading
  }] = useUpload();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [existingData, setExistingData] = useState(null);
  const [nik, setNik] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("PT");
  const [npwp, setNpwp] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [establishmentYear, setEstablishmentYear] = useState("");
  const [businessFields, setBusinessFields] = useState([]);
  const [newBusinessField, setNewBusinessField] = useState("");
  const [smallClassification, setSmallClassification] = useState("");
  const [mediumClassification, setMediumClassification] = useState("");
  const [largeClassification, setLargeClassification] = useState("");
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const res = await fetch("/api/contractors/my-profile");
        if (res.ok) {
          const data = await res.json();
          if (data.contractor) {
            setExistingData(data.contractor);
            setNik(data.contractor.nik || "");
            setFullName(data.contractor.full_name || "");
            setBirthPlace(data.contractor.birth_place || "");
            setBirthDate(data.contractor.birth_date || "");
            setPhone(data.contractor.phone || "");
            setEmail(data.contractor.email || user?.email || "");
            setAddress(data.contractor.address || "");
            setCity(data.contractor.city || "");
            setCompanyName(data.contractor.company_name || "");
            setCompanyType(data.contractor.company_type || "PT");
            setNpwp(data.contractor.npwp || "");
            setCompanyAddress(data.contractor.company_address || "");
            setCompanyPhone(data.contractor.company_phone || "");
            setEstablishmentYear(data.contractor.establishment_year || "");
            setBusinessFields(data.contractor.business_field || []);
            setSmallClassification(data.contractor.small_classification || "");
            setMediumClassification(data.contractor.medium_classification || "");
            setLargeClassification(data.contractor.large_classification || "");
          } else {
            setEmail(user?.email || "");
          }
        }
      } catch (err) {
        console.error("Error fetching existing data:", err);
      }
    };
    if (user) {
      fetchExistingData();
    }
  }, [user]);
  const addBusinessField = () => {
    if (newBusinessField.trim()) {
      setBusinessFields([...businessFields, newBusinessField.trim()]);
      setNewBusinessField("");
    }
  };
  const removeBusinessField = (index) => {
    setBusinessFields(businessFields.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const contractorData = {
        nik,
        full_name: fullName,
        birth_place: birthPlace,
        birth_date: birthDate,
        phone,
        email,
        address,
        city,
        company_name: companyName,
        company_type: companyType,
        npwp,
        company_address: companyAddress,
        company_phone: companyPhone,
        establishment_year: establishmentYear ? parseInt(establishmentYear) : null,
        business_field: businessFields,
        small_classification: smallClassification,
        medium_classification: mediumClassification,
        large_classification: largeClassification
      };
      let res;
      if (existingData) {
        res = await fetch(`/api/contractors/${existingData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contractorData)
        });
      } else {
        res = await fetch("/api/contractors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contractorData)
        });
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Terjadi kesalahan");
      }
      setSuccess(existingData ? "Data berhasil diupdate!" : "Pendaftaran berhasil! Data Anda akan diverifikasi oleh admin.");
      setTimeout(() => {
        window.location.href = "/contractor/profile";
      }, 2e3);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  if (userLoading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-b6de55ea",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-68a9a4d3",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-bb1a556c",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-e6d8ff90",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "max-w-4xl mx-auto flex items-center justify-between",
        renderId: "render-39d214b2",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-4",
          renderId: "render-30207fed",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/",
            className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
            renderId: "render-7df3ba8b",
            as: "button",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 text-[#6F7689]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-1ae06d6d",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#2A2E45]",
              renderId: "render-b44c57a1",
              as: "h1",
              children: existingData ? "Update Data Kontraktor" : "Pendaftaran Kontraktor OAP"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-3e110f71",
              as: "p",
              children: "Dinas Sosial dan PPPA Papua Barat Daya"
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "max-w-4xl mx-auto p-6",
      renderId: "render-a887609e",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onSubmit: handleSubmit,
        className: "space-y-6",
        renderId: "render-748ac77e",
        as: "form",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-e59535e2",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45] mb-4",
            renderId: "render-2bc69fc1",
            as: "h2",
            children: "Data Pribadi"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            renderId: "render-38143e44",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-b4a0175d",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-6925ac50",
                as: "label",
                children: ["NIK ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-red-500",
                  renderId: "render-9afb6c91",
                  as: "span",
                  children: "*"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: nik,
                onChange: (e) => setNik(e.target.value),
                required: true,
                maxLength: 16,
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "16 digit NIK",
                renderId: "render-add1f79b",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-b2a83fa0",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-52a38307",
                as: "label",
                children: ["Nama Lengkap ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-red-500",
                  renderId: "render-b9fc9348",
                  as: "span",
                  children: "*"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: fullName,
                onChange: (e) => setFullName(e.target.value),
                required: true,
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-8cf0acd8",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-21465f0a",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-8fd48666",
                as: "label",
                children: "Tempat Lahir"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: birthPlace,
                onChange: (e) => setBirthPlace(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-f63c9a44",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-fac6890c",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-8463f344",
                as: "label",
                children: "Tanggal Lahir"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "date",
                value: birthDate,
                onChange: (e) => setBirthDate(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-8abac627",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-86efde98",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-d7f9f2a3",
                as: "label",
                children: ["No. Telepon ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-red-500",
                  renderId: "render-15b356b1",
                  as: "span",
                  children: "*"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "tel",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                required: true,
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "08xxxxxxxxxx",
                renderId: "render-490c37c3",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-506cc055",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-7a69fd85",
                as: "label",
                children: "Email"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-f6ce5df0",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "md:col-span-2",
              renderId: "render-a5b8f107",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-f7525582",
                as: "label",
                children: ["Alamat ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-red-500",
                  renderId: "render-2c7b0c27",
                  as: "span",
                  children: "*"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: address,
                onChange: (e) => setAddress(e.target.value),
                required: true,
                rows: 3,
                className: "w-full px-3 py-2 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-7e17bf74",
                as: "textarea"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-720feabf",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-a6398026",
                as: "label",
                children: "Kota/Kabupaten"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: city,
                onChange: (e) => setCity(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-d168b662",
                as: "input"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-65f92fdc",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45] mb-4",
            renderId: "render-b039fa66",
            as: "h2",
            children: "Data Perusahaan"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            renderId: "render-4bb88961",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "md:col-span-2",
              renderId: "render-3495f8f4",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-dcf1fa7b",
                as: "label",
                children: ["Nama Perusahaan ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-red-500",
                  renderId: "render-a06d056c",
                  as: "span",
                  children: "*"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: companyName,
                onChange: (e) => setCompanyName(e.target.value),
                required: true,
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-74670c9d",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-daa0d6d1",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-d18558c7",
                as: "label",
                children: "Jenis Perusahaan"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                value: companyType,
                onChange: (e) => setCompanyType(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-7c2f8113",
                as: "select",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "PT",
                  renderId: "render-976d8859",
                  as: "option",
                  children: "PT (Perseroan Terbatas)"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "CV",
                  renderId: "render-5b16a423",
                  as: "option",
                  children: "CV (Commanditaire Vennootschap)"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "UD",
                  renderId: "render-cb617760",
                  as: "option",
                  children: "UD (Usaha Dagang)"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "Perorangan",
                  renderId: "render-86719fb5",
                  as: "option",
                  children: "Perorangan"
                })]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-7db701eb",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-86b60998",
                as: "label",
                children: "NPWP"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: npwp,
                onChange: (e) => setNpwp(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "00.000.000.0-000.000",
                renderId: "render-a63a1f0a",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "md:col-span-2",
              renderId: "render-0f624b6e",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-6a46fa7d",
                as: "label",
                children: "Alamat Kantor"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: companyAddress,
                onChange: (e) => setCompanyAddress(e.target.value),
                rows: 2,
                className: "w-full px-3 py-2 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-6da4206d",
                as: "textarea"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-31245a4c",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-f7e2a054",
                as: "label",
                children: "Telepon Kantor"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "tel",
                value: companyPhone,
                onChange: (e) => setCompanyPhone(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-0dada1da",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-9da83b1e",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-67409c17",
                as: "label",
                children: "Tahun Berdiri"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "number",
                value: establishmentYear,
                onChange: (e) => setEstablishmentYear(e.target.value),
                min: "1900",
                max: (/* @__PURE__ */ new Date()).getFullYear(),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "2020",
                renderId: "render-078c34b5",
                as: "input"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-53c10cd2",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45] mb-4",
            renderId: "render-9d9b1375",
            as: "h2",
            children: "Klasifikasi & Bidang Usaha"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",
            renderId: "render-7e94d366",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-288187fa",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-deae5e39",
                as: "label",
                children: "Kelas Kecil"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: smallClassification,
                onChange: (e) => setSmallClassification(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "K1, K2, K3",
                renderId: "render-a82a44db",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-7e36b946",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-6d906971",
                as: "label",
                children: "Kelas Menengah"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: mediumClassification,
                onChange: (e) => setMediumClassification(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "M1, M2",
                renderId: "render-afb1997f",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-4240530c",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-b6ec8a40",
                as: "label",
                children: "Kelas Besar"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: largeClassification,
                onChange: (e) => setLargeClassification(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "B1, B2",
                renderId: "render-58564a35",
                as: "input"
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-0af7501b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-sm font-medium text-[#2A2E45] mb-2",
              renderId: "render-b325b649",
              as: "label",
              children: "Bidang Usaha"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex space-x-2 mb-2",
              renderId: "render-a1d26020",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: newBusinessField,
                onChange: (e) => setNewBusinessField(e.target.value),
                onKeyPress: (e) => e.key === "Enter" && (e.preventDefault(), addBusinessField()),
                className: "flex-1 h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "Contoh: Pembangunan Jalan",
                renderId: "render-e4bd69be",
                as: "input"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                type: "button",
                onClick: addBusinessField,
                className: "px-4 h-10 bg-[#1570FF] text-white rounded text-sm flex items-center space-x-2 hover:bg-[#0F5FE6]",
                renderId: "render-edb096a5",
                as: "button",
                children: [/* @__PURE__ */ jsx(Plus, {
                  className: "w-4 h-4"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-ef69ddc6",
                  as: "span",
                  children: "Tambah"
                })]
              })]
            }), businessFields.length > 0 && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2",
              renderId: "render-85814f2d",
              as: "div",
              children: businessFields.map((field, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center space-x-2 bg-[#EDF3FF] px-3 py-1 rounded-full",
                renderId: "render-e666476c",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-sm text-[#1570FF]",
                  renderId: "render-914a42ff",
                  as: "span",
                  children: field
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "button",
                  onClick: () => removeBusinessField(index),
                  className: "text-[#1570FF] hover:text-[#0F5FE6]",
                  renderId: "render-fa911c95",
                  as: "button",
                  children: /* @__PURE__ */ jsx(X, {
                    className: "w-4 h-4"
                  })
                })]
              }, index))
            })]
          })]
        }), error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-red-50 border border-red-200 rounded p-4 text-sm text-red-800",
          renderId: "render-5f460b8a",
          as: "div",
          children: error
        }), success && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-green-50 border border-green-200 rounded p-4 text-sm text-green-800",
          renderId: "render-d4523ca4",
          as: "div",
          children: success
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex justify-end space-x-3",
          renderId: "render-65d697e9",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => window.location.href = "/",
            className: "px-6 h-10 bg-white border border-[#E4E9F2] text-[#2A2E45] rounded text-sm font-semibold hover:bg-[#F7F9FC]",
            renderId: "render-513f181a",
            as: "button",
            children: "Batal"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "submit",
            disabled: loading,
            className: "px-6 h-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6] disabled:opacity-50",
            renderId: "render-2bc0f284",
            as: "button",
            children: loading ? "Menyimpan..." : existingData ? "Update Data" : "Daftar"
          })]
        })]
      })
    })]
  });
}

const page$3 = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ContractorRegisterPage, {
      ...props
    })
  });
});

const route11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$3
}, Symbol.toStringTag, { value: 'Module' }));

function DisabilityListPage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const fetchData = async () => {
    try {
      const res = await fetch("/api/disability");
      if (res.ok) {
        const json = await res.json();
        setData(json.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
    if (user) {
      fetchData();
    }
  }, [user, userLoading]);
  const filteredData = data.filter((item) => item.full_name?.toLowerCase().includes(search.toLowerCase()) || item.nik?.includes(search));
  if (userLoading || loading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex items-center justify-center min-h-[400px]",
      renderId: "render-b13c4dba",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-400",
        renderId: "render-474b2de1",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "space-y-6",
    renderId: "render-d7cf5628",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
      renderId: "render-f027f5d8",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "relative flex-1 max-w-md",
        renderId: "render-7ede295b",
        as: "div",
        children: [/* @__PURE__ */ jsx(Search, {
          className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          type: "text",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Cari Nama atau NIK...",
          className: "w-full h-12 pl-12 pr-4 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-sm",
          renderId: "render-0e1702fe",
          as: "input"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center space-x-3",
        renderId: "render-f547ce95",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "h-12 px-4 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center space-x-2 shadow-sm",
          renderId: "render-037945f7",
          as: "button",
          children: [/* @__PURE__ */ jsx(Filter, {
            className: "w-4 h-4"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-24906826",
            as: "span",
            children: "Filter"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "h-12 px-4 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center space-x-2 shadow-sm",
          renderId: "render-94f61a62",
          as: "button",
          children: [/* @__PURE__ */ jsx(Download, {
            className: "w-4 h-4"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-35f2c617",
            as: "span",
            children: "Export"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden",
      renderId: "render-2aff8711",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "overflow-x-auto",
        renderId: "render-12d11d9b",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "w-full text-left",
          renderId: "render-643d0e22",
          as: "table",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-94b2c8d0",
            as: "thead",
            children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-gray-50 border-b border-gray-100",
              renderId: "render-c4844d67",
              as: "tr",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider",
                renderId: "render-723f6518",
                as: "th",
                children: "Nama Lengkap"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider",
                renderId: "render-5749f3be",
                as: "th",
                children: "NIK"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider",
                renderId: "render-69829077",
                as: "th",
                children: "Kabupaten/Kota"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider",
                renderId: "render-a7e9e61b",
                as: "th",
                children: "Jenis Disabilitas"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider",
                renderId: "render-58a95199",
                as: "th",
                children: "No. Telepon"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider",
                renderId: "render-916baeda",
                as: "th",
                children: "Status"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right",
                renderId: "render-e7ba92a8",
                as: "th",
                children: "Aksi"
              })]
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "divide-y divide-gray-100",
            renderId: "render-4e65ce72",
            as: "tbody",
            children: filteredData.length > 0 ? filteredData.map((item) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "hover:bg-gray-50 transition-colors",
              renderId: "render-57b41ce8",
              as: "tr",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4",
                renderId: "render-f473762f",
                as: "td",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-sm font-semibold text-gray-800",
                  renderId: "render-1f0a3f58",
                  as: "p",
                  children: item.full_name
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-sm text-gray-500",
                renderId: "render-03a9b7e6",
                as: "td",
                children: item.nik
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-sm text-gray-500",
                renderId: "render-8586ab6c",
                as: "td",
                children: item.regency
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4",
                renderId: "render-f81f7df6",
                as: "td",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full tracking-wider",
                  renderId: "render-fb0d751e",
                  as: "span",
                  children: item.disability_type
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-sm text-gray-500",
                renderId: "render-c174067f",
                as: "td",
                children: item.phone
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4",
                renderId: "render-68944865",
                as: "td",
                children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-center space-x-1.5 container",
                  renderId: "render-8915e810",
                  as: "span",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "w-1.5 h-1.5 rounded-full bg-green-500",
                    renderId: "render-611193d2",
                    as: "span"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-sm text-gray-600 font-medium",
                    renderId: "render-d272dab9",
                    as: "span",
                    children: "Terverifikasi"
                  })]
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-6 py-4 text-right",
                renderId: "render-56386cf9",
                as: "td",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "p-2 text-gray-400 hover:text-gray-600 transition-colors",
                  renderId: "render-aab5db77",
                  as: "button",
                  children: /* @__PURE__ */ jsx(MoreHorizontal, {
                    className: "w-5 h-5"
                  })
                })
              })]
            }, item.id)) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              renderId: "render-16a9327d",
              as: "tr",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                colSpan: "7",
                className: "px-6 py-12 text-center text-gray-400 text-sm",
                renderId: "render-98ef2950",
                as: "td",
                children: "Tidak ada data ditemukan"
              })
            })
          })]
        })
      })
    })]
  });
}

const page$2 = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(DisabilityListPage, {
      ...props
    })
  });
});

const route12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$2
}, Symbol.toStringTag, { value: 'Module' }));

function DisabilityDashboard() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [stats, setStats] = useState({
    total: 0,
    regencies: 6,
    categories: 4
  });
  const [chartData] = useState([{
    name: "Kota Sorong",
    value: 0
  }, {
    name: "Kab. Sorong",
    value: 0
  }, {
    name: "Sorong Selatan",
    value: 0
  }, {
    name: "Raja Ampat",
    value: 0
  }, {
    name: "Tambrauw",
    value: 0
  }, {
    name: "Maybrat",
    value: 0
  }]);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  if (userLoading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex items-center justify-center min-h-[400px]",
      renderId: "render-ccf5ee17",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-400",
        renderId: "render-53ea84bb",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  const COLORS = ["#1570FF", "#0F5FE6", "#0A4ED2", "#063CBF", "#042BAB", "#021A97"];
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "space-y-8",
    renderId: "render-775dec16",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "grid grid-cols-1 md:grid-cols-3 gap-6",
      renderId: "render-fc516c5b",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6",
        renderId: "render-5a46f4f2",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center",
          renderId: "render-db34a0af",
          as: "div",
          children: /* @__PURE__ */ jsx(Users, {
            className: "w-7 h-7 text-blue-600"
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-a76817d5",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-gray-400",
            renderId: "render-fa0065a6",
            as: "p",
            children: "Total Terdata"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-3xl font-black text-gray-800",
            renderId: "render-5f082ffa",
            as: "h3",
            children: stats.total
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6",
        renderId: "render-31d28eb8",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center",
          renderId: "render-7d418f38",
          as: "div",
          children: /* @__PURE__ */ jsx(MapPin, {
            className: "w-7 h-7 text-green-600"
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-efa2019c",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-gray-400",
            renderId: "render-d77ceff9",
            as: "p",
            children: "Kabupaten/Kota"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-3xl font-black text-gray-800",
            renderId: "render-f54b67a7",
            as: "h3",
            children: stats.regencies
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6",
        renderId: "render-a47a09a9",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center",
          renderId: "render-50b91511",
          as: "div",
          children: /* @__PURE__ */ jsx(PieChart, {
            className: "w-7 h-7 text-purple-600"
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-86ca5d09",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-gray-400",
            renderId: "render-814f1c3b",
            as: "p",
            children: "Kategori Disabilitas"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-3xl font-black text-gray-800",
            renderId: "render-c6979868",
            as: "h3",
            children: stats.categories
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "bg-white p-8 rounded-3xl shadow-sm border border-gray-100",
      renderId: "render-56ad3907",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-lg font-bold text-gray-800 mb-8",
        renderId: "render-ea3afb39",
        as: "h3",
        children: "Sebaran Wilayah"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "h-[400px] w-full",
        renderId: "render-33d077ae",
        as: "div",
        children: /* @__PURE__ */ jsx(ResponsiveContainer, {
          width: "100%",
          height: "100%",
          children: /* @__PURE__ */ jsxs(BarChart, {
            data: chartData,
            margin: {
              top: 20,
              right: 30,
              left: 20,
              bottom: 40
            },
            children: [/* @__PURE__ */ jsx(CartesianGrid, {
              strokeDasharray: "3 3",
              vertical: false,
              stroke: "#F0F0F0"
            }), /* @__PURE__ */ jsx(XAxis, {
              dataKey: "name",
              axisLine: false,
              tickLine: false,
              tick: {
                fill: "#9CA3AF",
                fontSize: 12
              },
              interval: 0,
              angle: -15,
              textAnchor: "end"
            }), /* @__PURE__ */ jsx(YAxis, {
              axisLine: false,
              tickLine: false,
              tick: {
                fill: "#9CA3AF",
                fontSize: 12
              }
            }), /* @__PURE__ */ jsx(Tooltip, {
              cursor: {
                fill: "#F9FAFB"
              },
              contentStyle: {
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
              }
            }), /* @__PURE__ */ jsx(Bar, {
              dataKey: "value",
              radius: [6, 6, 0, 0],
              barSize: 40,
              children: chartData.map((entry, index) => /* @__PURE__ */ jsx(Cell, {
                fill: COLORS[index % COLORS.length]
              }, `cell-${index}`))
            })]
          })
        })
      })]
    })]
  });
}

const page$1 = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(DisabilityDashboard, {
      ...props
    })
  });
});

const route13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$1
}, Symbol.toStringTag, { value: 'Module' }));

function DisabilityRegisterPage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Laki-laki");
  const [regency, setRegency] = useState("Kota Sorong");
  const [disabilityType, setDisabilityType] = useState("Disabilitas Fisik");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const disabilityData = {
        full_name: fullName,
        nik,
        birth_place: birthPlace,
        birth_date: birthDate,
        gender,
        regency,
        disability_type: disabilityType,
        phone,
        address
      };
      const res = await fetch("/api/disability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(disabilityData)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Terjadi kesalahan saat menyimpan data");
      }
      setSuccess("Pendaftaran berhasil! Data telah tersimpan.");
      setFullName("");
      setNik("");
      setBirthPlace("");
      setBirthDate("");
      setPhone("");
      setAddress("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (userLoading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex items-center justify-center min-h-[400px]",
      renderId: "render-f7f76090",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-400",
        renderId: "render-af3be294",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "max-w-4xl mx-auto",
    renderId: "render-58daff0c",
    as: "div",
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      onSubmit: handleSubmit,
      className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
      renderId: "render-79d3ff5a",
      as: "form",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "p-8 space-y-8",
        renderId: "render-46ec2826",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
          renderId: "render-b24462bc",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-2",
            renderId: "render-f95d3dd1",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-700",
              renderId: "render-8ac16bfa",
              as: "label",
              children: "Nama Lengkap"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "text",
              value: fullName,
              onChange: (e) => setFullName(e.target.value),
              placeholder: "Masukkan nama sesuai KTP",
              required: true,
              className: "w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner",
              renderId: "render-214aab72",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-2",
            renderId: "render-74194ca0",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-700",
              renderId: "render-aa85a00c",
              as: "label",
              children: "NIK (16 Digit)"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "text",
              value: nik,
              onChange: (e) => setNik(e.target.value),
              placeholder: "33xxxxxxxxxxxxxx",
              required: true,
              maxLength: 16,
              className: "w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner",
              renderId: "render-bdf74201",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-2",
            renderId: "render-b6d4a079",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-700",
              renderId: "render-151a2ec1",
              as: "label",
              children: "Tempat Lahir"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "text",
              value: birthPlace,
              onChange: (e) => setBirthPlace(e.target.value),
              placeholder: "Contoh: Sorong",
              className: "w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner",
              renderId: "render-1b6e8bc2",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-2",
            renderId: "render-f8544529",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-700",
              renderId: "render-c8dc6f7c",
              as: "label",
              children: "Tanggal Lahir"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "date",
              value: birthDate,
              onChange: (e) => setBirthDate(e.target.value),
              className: "w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner",
              renderId: "render-cac13b9a",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-2",
            renderId: "render-bacfcb06",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-700",
              renderId: "render-6db04521",
              as: "label",
              children: "Jenis Kelamin"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              value: gender,
              onChange: (e) => setGender(e.target.value),
              className: "w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner appearance-none",
              renderId: "render-542a9fb2",
              as: "select",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Laki-laki",
                renderId: "render-aa11123a",
                as: "option",
                children: "Laki-laki"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Perempuan",
                renderId: "render-4c184197",
                as: "option",
                children: "Perempuan"
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-2",
            renderId: "render-41c8b9fa",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-700",
              renderId: "render-0ba8fdec",
              as: "label",
              children: "Kabupaten/Kota"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              value: regency,
              onChange: (e) => setRegency(e.target.value),
              className: "w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner appearance-none",
              renderId: "render-1509e0ad",
              as: "select",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Kota Sorong",
                renderId: "render-ea0fc8c2",
                as: "option",
                children: "Kota Sorong"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Kab. Sorong",
                renderId: "render-2c11cbff",
                as: "option",
                children: "Kab. Sorong"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Kab. Sorong Selatan",
                renderId: "render-10f31a1c",
                as: "option",
                children: "Kab. Sorong Selatan"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Kab. Raja Ampat",
                renderId: "render-e7339fea",
                as: "option",
                children: "Kab. Raja Ampat"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Kab. Tambrauw",
                renderId: "render-ac75d753",
                as: "option",
                children: "Kab. Tambrauw"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Kab. Maybrat",
                renderId: "render-e6b30c45",
                as: "option",
                children: "Kab. Maybrat"
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-2",
            renderId: "render-599e4154",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-700",
              renderId: "render-63c558f8",
              as: "label",
              children: "Jenis Disabilitas"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              value: disabilityType,
              onChange: (e) => setDisabilityType(e.target.value),
              className: "w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner appearance-none",
              renderId: "render-6965f163",
              as: "select",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Disabilitas Fisik",
                renderId: "render-ed0859cf",
                as: "option",
                children: "Disabilitas Fisik"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Disabilitas Intelektual",
                renderId: "render-f9d7e1b0",
                as: "option",
                children: "Disabilitas Intelektual"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Disabilitas Mental",
                renderId: "render-1c7b015f",
                as: "option",
                children: "Disabilitas Mental"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "Disabilitas Sensorik",
                renderId: "render-5864911f",
                as: "option",
                children: "Disabilitas Sensorik"
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-2",
            renderId: "render-54a91298",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-700",
              renderId: "render-5241e85d",
              as: "label",
              children: "No. Telepon/WA"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "tel",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "08xxxxxxxxxx",
              className: "w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner",
              renderId: "render-035cdf88",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2 space-y-2",
            renderId: "render-798e4032",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-700",
              renderId: "render-83675bdb",
              as: "label",
              children: "Alamat Lengkap"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              value: address,
              onChange: (e) => setAddress(e.target.value),
              placeholder: "Alamat detail (Jalan, No Rumah, RT/RW, Desa/Kelurahan)",
              rows: 4,
              className: "w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner",
              renderId: "render-60669e95",
              as: "textarea"
            })]
          })]
        }), error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm",
          renderId: "render-f712ad5b",
          as: "div",
          children: error
        }), success && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "p-4 bg-green-50 border border-green-100 rounded-xl text-green-600 text-sm",
          renderId: "render-701765ba",
          as: "div",
          children: success
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex justify-end pt-4",
          renderId: "render-799ecc35",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "submit",
            disabled: loading,
            className: "px-10 h-14 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 shadow-lg shadow-blue-200 flex items-center space-x-2",
            renderId: "render-c382db22",
            as: "button",
            children: loading ? "Menyimpan..." : /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx(Save, {
                className: "w-4 h-4"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-d47d537b",
                as: "span",
                children: "Simpan Data"
              })]
            })
          })
        })]
      })
    })
  });
}

const page = withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(DisabilityRegisterPage, {
      ...props
    })
  });
});

const route14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: 'Module' }));

async function loader({
  params
}) {
  const matches = await fg("src/**/page.{js,jsx,ts,tsx}");
  return {
    path: `/${params["*"]}`,
    pages: matches.sort((a, b) => a.length - b.length).map(match => {
      const url = match.replace("src/app", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "") || "/";
      const path = url.replaceAll("[", "").replaceAll("]", "");
      const displayPath = path === "/" ? "Homepage" : path;
      return {
        url,
        path: displayPath
      };
    })
  };
}
const notFound = withComponentProps(function CreateDefaultNotFoundPage({
  loaderData
}) {
  const [siteMap, setSitemap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      const handler = event => {
        if (event.data.type === "sandbox:sitemap") {
          window.removeEventListener("message", handler);
          setSitemap(event.data.sitemap);
        }
      };
      window.parent.postMessage({
        type: "sandbox:sitemap"
      }, "*");
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    }
  }, []);
  const missingPath = loaderData.path.replace(/^\//, "");
  const existingRoutes = loaderData.pages.map(page => ({
    path: page.path,
    url: page.url
  }));
  const handleBack = () => {
    navigate("/");
  };
  const handleSearch = value => {
    if (!siteMap) {
      const path = `/${value}`;
      navigate(path);
    } else {
      navigate(value);
    }
  };
  const handleCreatePage = useCallback(() => {
    window.parent.postMessage({
      type: "sandbox:web:create",
      path: missingPath,
      view: "web"
    }, "*");
  }, [missingPath]);
  return /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
    className: "flex sm:w-full w-screen sm:min-w-[850px] flex-col",
    renderId: "render-839b98a2",
    as: "div",
    children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex w-full items-center gap-2 p-5",
      renderId: "render-26f2c6f1",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        type: "button",
        onClick: handleBack,
        className: "flex items-center justify-center w-10 h-10 rounded-md",
        renderId: "render-a8471dbf",
        as: "button",
        children: /* @__PURE__ */jsxs("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "Back",
          role: "img",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M8.5957 2.65435L2.25005 9L8.5957 15.3457",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-3262f3ae",
            as: "path"
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M2.25007 9L15.75 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-6804e28d",
            as: "path"
          })]
        })
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "flex flex-row divide-x divide-gray-200 rounded-[8px] h-8 w-[300px] border border-gray-200 bg-gray-50 text-gray-500",
        renderId: "render-3d7f5808",
        as: "div",
        children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center px-[14px] py-[5px]",
          renderId: "render-90816a7f",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            renderId: "render-cccd8acf",
            as: "span",
            children: "/"
          })
        }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center min-w-0",
          renderId: "render-9b256f1c",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "border-0 bg-transparent px-3 py-2 focus:outline-none truncate max-w-[300px]",
            style: {
              minWidth: 0
            },
            title: missingPath,
            renderId: "render-d7fba9f6",
            as: "p",
            children: missingPath
          })
        })]
      })]
    }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex flex-grow flex-col items-center justify-center pt-[100px] text-center gap-[20px]",
      renderId: "render-dba95c96",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "text-4xl font-medium text-gray-900 px-2",
        renderId: "render-8ab58470",
        as: "h1",
        children: "Uh-oh! This page doesn't exist (yet)."
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "pt-4 pb-12 px-2 text-gray-500",
        renderId: "render-82658d1b",
        as: "p",
        children: ['Looks like "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "font-bold",
          renderId: "render-88d3f06c",
          as: "span",
          children: ["/", missingPath]
        }), `" isn't part of your project. But no worries, you've got options!`]
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "px-[20px] w-full",
        renderId: "render-ffad5de9",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-row justify-center items-center w-full max-w-[800px] mx-auto border border-gray-200 rounded-lg p-[20px] mb-[40px] gap-[20px]",
          renderId: "render-c6216167",
          as: "div",
          children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-[5px] items-start self-start w-1/2",
            renderId: "render-99ee8b8a",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-black text-left",
              renderId: "render-2bd9e305",
              as: "p",
              children: "Build it from scratch"
            }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 text-left",
              renderId: "render-b09db86f",
              as: "p",
              children: ['Create a new page to live at "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
                renderId: "render-4f26d44b",
                as: "span",
                children: ["/", missingPath]
              }), '"']
            })]
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "flex flex-row items-center justify-end w-1/2",
            renderId: "render-76fabb1f",
            as: "div",
            children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              type: "button",
              className: "bg-black text-white px-[10px] py-[5px] rounded-md",
              onClick: () => handleCreatePage(),
              renderId: "render-29daad33",
              as: "button",
              children: "Create Page"
            })
          })]
        })
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "pb-20 lg:pb-[80px]",
        renderId: "render-ecb1a123",
        as: "div",
        children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center text-gray-500",
          renderId: "render-640462a2",
          as: "p",
          children: "Check out all your project's routes here ↓"
        })
      }), siteMap ? /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-col justify-center items-center w-full px-[50px]",
        renderId: "render-fd19b4d0",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col justify-between items-center w-full max-w-[600px] gap-[10px]",
          renderId: "render-ca44338b",
          as: "div",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "text-sm text-gray-300 pb-[10px] self-start p-4",
            renderId: "render-10003405",
            as: "p",
            children: "PAGES"
          }), siteMap.webPages?.map(route => /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => handleSearch(route.cleanRoute || ""),
            className: "flex flex-row justify-between text-center items-center p-4 rounded-lg bg-white shadow-sm w-full hover:bg-gray-50",
            renderId: "render-3d0cc850",
            as: "button",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "font-medium text-gray-900",
              renderId: "render-d89c1aa9",
              as: "h3",
              children: route.name
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-400",
              renderId: "render-02ca05d4",
              as: "p",
              children: route.cleanRoute
            })]
          }, route.id))]
        })
      }) : /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-3 w-full max-w-[80rem] mx-auto pb-5 px-2",
        renderId: "render-b748b977",
        as: "div",
        children: existingRoutes.map(route => /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex flex-col flex-grow basis-full sm:basis-[calc(50%-0.375rem)] xl:basis-[calc(33.333%-0.5rem)]",
          renderId: "render-9b5a7554",
          as: "div",
          children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "w-full flex-1 flex flex-col items-center ",
            renderId: "render-1cf40fd0",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "relative w-full max-w-[350px] h-48 sm:h-56 lg:h-64 overflow-hidden rounded-[8px] border border-comeback-gray-75 transition-all group-hover:shadow-md",
              renderId: "render-5701a622",
              as: "div",
              children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
                type: "button",
                onClick: () => handleSearch(route.url.replace(/^\//, "")),
                className: "h-full w-full rounded-[8px] bg-gray-50 bg-cover",
                renderId: "render-e764f9cd",
                as: "button"
              })
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "pt-3 text-left text-gray-500 w-full max-w-[350px]",
              renderId: "render-96952f6b",
              as: "p",
              children: route.path
            })]
          })
        }, route.path))
      })]
    })]
  });
});

const route15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: notFound,
  loader
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-Bw_v3pY5.js','imports':['/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/index-pCNnsjO-.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/root-fpb79Ka6.js','imports':['/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/index-pCNnsjO-.js','/assets/with-props-C5IFgWZc.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/react-DRUH8C2z.js','/assets/clsx-DBz8XMeR.js'],'css':['/assets/root-vFSJpNsU.css'],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'page':{'id':'page','parentId':'root','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-Pb3y2uKJ.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/error/page':{'id':'account/error/page','parentId':'root','path':'account/error','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-ouidOYNx.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/logout/page':{'id':'account/logout/page','parentId':'root','path':'account/logout','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-r4qkY9Kn.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/useAuth-BlAUt43I.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/signin/page':{'id':'account/signin/page','parentId':'root','path':'account/signin','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-DxChp0Pg.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/useAuth-BlAUt43I.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/signup/page':{'id':'account/signup/page','parentId':'root','path':'account/signup','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-Cu2JKaa2.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/useAuth-BlAUt43I.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/contractors/page':{'id':'admin/contractors/page','parentId':'root','path':'admin/contractors','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-P24bceyf.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/createLucideIcon-DGNd51Bi.js','/assets/arrow-left-_kXw13UA.js','/assets/search-BylguWBh.js','/assets/clock-ChL-zaAD.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/contractors/[id]/page':{'id':'admin/contractors/[id]/page','parentId':'root','path':'admin/contractors/:id','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-Di1ZBDKg.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/createLucideIcon-DGNd51Bi.js','/assets/arrow-left-_kXw13UA.js','/assets/clock-ChL-zaAD.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/dashboard/page':{'id':'admin/dashboard/page','parentId':'root','path':'admin/dashboard','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-BXtJbj0i.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/createLucideIcon-DGNd51Bi.js','/assets/arrow-left-_kXw13UA.js','/assets/users-DjETfZV3.js','/assets/clock-ChL-zaAD.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/make-first-admin/page':{'id':'admin/make-first-admin/page','parentId':'root','path':'admin/make-first-admin','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-ByArBwNJ.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/createLucideIcon-DGNd51Bi.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'contractor/profile/page':{'id':'contractor/profile/page','parentId':'root','path':'contractor/profile','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-BIRH3bxf.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/createLucideIcon-DGNd51Bi.js','/assets/arrow-left-_kXw13UA.js','/assets/clock-ChL-zaAD.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'contractor/register/page':{'id':'contractor/register/page','parentId':'root','path':'contractor/register','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-DY_MCeTf.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/createLucideIcon-DGNd51Bi.js','/assets/arrow-left-_kXw13UA.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'daftar-data/page':{'id':'daftar-data/page','parentId':'root','path':'daftar-data','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-DC7On9UX.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/createLucideIcon-DGNd51Bi.js','/assets/search-BylguWBh.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'dashboard/page':{'id':'dashboard/page','parentId':'root','path':'dashboard','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-BFGrOp6F.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/createLucideIcon-DGNd51Bi.js','/assets/users-DjETfZV3.js','/assets/clsx-DBz8XMeR.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'tambah-data/page':{'id':'tambah-data/page','parentId':'root','path':'tambah-data','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-bYe7orrY.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/chunk-D4RADZKF-B1fEdaIG.js','/assets/layout-CeB7sAOJ.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/createLucideIcon-DGNd51Bi.js','/assets/react-DRUH8C2z.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'__create/not-found':{'id':'__create/not-found','parentId':'root','path':'*?','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/not-found-CJuIXLEK.js','imports':['/assets/with-props-C5IFgWZc.js','/assets/PolymorphicComponent-BXHKhbGx.js','/assets/chunk-D4RADZKF-B1fEdaIG.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-58d261cf.js','version':'58d261cf','sri':undefined};

const assetsBuildDirectory = "build\\client";
      const basename = "/";
      const future = {"unstable_middleware":false,"unstable_optimizeDeps":false,"unstable_splitRouteModules":false,"unstable_subResourceIntegrity":false,"unstable_viteEnvironmentApi":false};
      const ssr = true;
      const isSpaMode = false;
      const prerender = [];
      const routeDiscovery = {"mode":"lazy","manifestPath":"/__manifest"};
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "page": {
          id: "page",
          parentId: "root",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route1
        },
  "account/error/page": {
          id: "account/error/page",
          parentId: "root",
          path: "account/error",
          index: undefined,
          caseSensitive: undefined,
          module: route2
        },
  "account/logout/page": {
          id: "account/logout/page",
          parentId: "root",
          path: "account/logout",
          index: undefined,
          caseSensitive: undefined,
          module: route3
        },
  "account/signin/page": {
          id: "account/signin/page",
          parentId: "root",
          path: "account/signin",
          index: undefined,
          caseSensitive: undefined,
          module: route4
        },
  "account/signup/page": {
          id: "account/signup/page",
          parentId: "root",
          path: "account/signup",
          index: undefined,
          caseSensitive: undefined,
          module: route5
        },
  "admin/contractors/page": {
          id: "admin/contractors/page",
          parentId: "root",
          path: "admin/contractors",
          index: undefined,
          caseSensitive: undefined,
          module: route6
        },
  "admin/contractors/[id]/page": {
          id: "admin/contractors/[id]/page",
          parentId: "root",
          path: "admin/contractors/:id",
          index: undefined,
          caseSensitive: undefined,
          module: route7
        },
  "admin/dashboard/page": {
          id: "admin/dashboard/page",
          parentId: "root",
          path: "admin/dashboard",
          index: undefined,
          caseSensitive: undefined,
          module: route8
        },
  "admin/make-first-admin/page": {
          id: "admin/make-first-admin/page",
          parentId: "root",
          path: "admin/make-first-admin",
          index: undefined,
          caseSensitive: undefined,
          module: route9
        },
  "contractor/profile/page": {
          id: "contractor/profile/page",
          parentId: "root",
          path: "contractor/profile",
          index: undefined,
          caseSensitive: undefined,
          module: route10
        },
  "contractor/register/page": {
          id: "contractor/register/page",
          parentId: "root",
          path: "contractor/register",
          index: undefined,
          caseSensitive: undefined,
          module: route11
        },
  "daftar-data/page": {
          id: "daftar-data/page",
          parentId: "root",
          path: "daftar-data",
          index: undefined,
          caseSensitive: undefined,
          module: route12
        },
  "dashboard/page": {
          id: "dashboard/page",
          parentId: "root",
          path: "dashboard",
          index: undefined,
          caseSensitive: undefined,
          module: route13
        },
  "tambah-data/page": {
          id: "tambah-data/page",
          parentId: "root",
          path: "tambah-data",
          index: undefined,
          caseSensitive: undefined,
          module: route14
        },
  "__create/not-found": {
          id: "__create/not-found",
          parentId: "root",
          path: "*?",
          index: undefined,
          caseSensitive: undefined,
          module: route15
        }
      };

export { serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
