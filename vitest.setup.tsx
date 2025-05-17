import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Router Mock
vi.mock("next/router", () => ({
  useRouter: vi.fn().mockReturnValue({
    pathname: "/",
    query: { language: "javascript" },
  }),
}));

// React Markdown Mock
vi.mock("react-markdown", () => {
  return {
    __esModule: true,
    default: (props: { readonly children: unknown }) => props.children,
  };
});

vi.mock("remark-gfm", () => {
  return {
    __esModule: true,
    default: () => void 0,
  };
});

// next/image Mock
vi.mock("next/image", () => {
  return {
    __esModule: true,
    // eslint-disable-next-line
    default: (props: any) => <img {...props} />,
  };
});

// jsdom missing functions mock
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
})) as unknown as typeof ResizeObserver;

globalThis.scrollTo = vi.fn(() => null);

// Storybook annotations
// const annotations = setProjectAnnotations([previewAnnotations]);

// MSW + Router setup
// beforeAll(() => {
//   getServer().listen();
//   annotations.beforeAll?.();
// });

// beforeEach(() => {
//   getServer().resetHandlers();
//   mockRouter.push("/");
//   createRouter({});
// });

// afterEach(() => {
//   vi.clearAllMocks();
// });

// afterAll(() => {
//   getServer().close();
// });
