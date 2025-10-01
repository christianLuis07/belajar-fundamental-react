import React, { useContext, useEffect, useState } from "react";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";
import { getContacts, deleteContact } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacts] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    getContacts().then(({ data }) => {
      setContacts(data);
    }, []);
  });

  async function onDeleteHandler(id) {
    await deleteContact(id);

    const { data } = await getContacts();
    setContacts(data);
  }

  async function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>{locale === "id" ? "Daftar Kontak" : "Contact List"}</h2>
      <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
    </section>
  );
}

export default HomePage;

// function HomePageWrapper() {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const keyword = searchParams.get("keyword");

//   function changeSearchParams(keyword) {
//     setSearchParams({ keyword });
//   }

//   return (
//     <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
//   );
// }

// class HomePage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       contacts: [],
//       keyword: props.defaultKeyword || "",
//     };

//     this.onDeleteHandler = this.onDeleteHandler.bind(this);
//     this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//   }

//   async onDeleteHandler(id) {
//     await deleteContact(id);

//     // update the contact state from data.js
//     const { data } = await getContacts();
//     this.setState(() => {
//       return {
//         contacts: data,
//       };
//     });
//   }

//   onKeywordChangeHandler(keyword) {
//     this.setState(() => {
//       return {
//         keyword,
//       };
//     });

//     this.props.keywordChange(keyword);
//   }

//   async componentDidMount() {
//     const { data } = await getContacts();

//     this.setState(() => {
//       return {
//         contacts: data,
//       };
//     });
//   }

//   render() {
//     const contacts = this.state.contacts.filter((contact) => {
//       return contact.name
//         .toLowerCase()
//         .includes(this.state.keyword.toLowerCase());
//     });
//     return (
//       <LocaleConsumer>
//         {({ locale }) => {
//           return (
//             <section>
//               <SearchBar
//                 keyword={this.state.keyword}
//                 keywordChange={this.onKeywordChangeHandler}
//               />
//               <h2>{locale === "id" ? "Daftar Kontak" : "Contact List"}</h2>
//               <ContactList
//                 contacts={contacts}
//                 onDelete={this.onDeleteHandler}
//               />
//             </section>
//           );
//         }}
//       </LocaleConsumer>
//     );
//   }
// }
