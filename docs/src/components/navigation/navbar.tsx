import { Navbar } from "nextra-theme-docs"

import { Logo } from "@/components/logo"

import { Header } from "./header"

export const navbar = (
  <Navbar
    logo={<Logo containerClassName="max-md:mr-6 mr-2 lg:mr-6" />}
    align="left"
    className="container mx-auto"
  >
    <Header />
  </Navbar>
)
