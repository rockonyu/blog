import React from "react"
import styled from "styled-components"

const MaxWidth = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1em;
`

const Section = styled.footer`
  background-color: #ececec;
  padding-bottom: 1em;
`
const PageTitle = styled.h3`
  margin-bottom: 0;
  border-bottom: solid 1px #2f393b;
  padding-bottom: 0.5em;
  padding-top: 1em;
  letter-spacing: 5px;
`
const ContactList = styled.ul`
  margin-top: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 1.5em;
`
const Item = styled.li`
  border-bottom: solid 1px #2f393b;
  padding: 0.5em 0;
`
const Title = styled.span`
  display: inline-block;
  word-wrap: break-word;
  width: 120px;
  font-weight: 600;
  @media (max-width: 767px) {
    display: block;
    width: auto;
  }
`
const TextContent = styled.span`
  display: inline-block;
  word-wrap: break-word;
  @media (max-width: 767px) {
    display: block;
    width: auto;
  }
`
const Link = styled.a`
  text-decoration: none;
  color: #2f393b;
`

const Footer: React.FunctionComponent<any> = ({
  name,
  enname,
  email,
  linkedin,
}) => (
  <Section>
    <MaxWidth>
      <PageTitle>CONTACT</PageTitle>
      <ContactList>
        <Item>
          <Title>Name</Title>
          <TextContent>{name + " " + enname}</TextContent>
        </Item>
        <Item>
          <Title>Email</Title>
          <TextContent>
            <Link href={"mailto:" + email}>{email}</Link>
          </TextContent>
        </Item>
        <Item>
          <Title>LinkedIn</Title>
          <TextContent>
            <Link href={linkedin} target="_blank" rel="noopener">
              {linkedin}
            </Link>
          </TextContent>
        </Item>
      </ContactList>
    </MaxWidth>
  </Section>
)

export default Footer
