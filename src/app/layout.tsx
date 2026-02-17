import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Score - Find The College That Fits You",
  description:
    "Discover and review colleges based on real student experiences. Make informed decisions about your education.",
};

/**layout.tsx files are for UI that wraps different pages */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header /> {/* Header stays at the top */}
            {/* Main tag with ID for the "Skip to Content" link */}
            <main id="main-content">{children}</main>
            <Footer /> {/* Footer stays at the bottom */}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
