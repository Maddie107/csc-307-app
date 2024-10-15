// src/MyApp.jsx (a new function inside the MyApp function)
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
	const [characters, setCharacters] = useState([]);
	function removeOneCharacter(index) {
		const updated = characters.filter((character, i) => {
			return i !== index;
		});
		const id = characters[index].id;
		const promise = fetch(`http://localhost:8000/users/${id}`, {
			method: "DELETE"
		});
		promise.then((res) => {
			if (res.status == 204){
				setCharacters(updated);
			}
		})
	}
	function fetchUsers() {
		const promise = fetch("http://localhost:8000/users");
		return promise;
	}
	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => {
				console.log(error);
			});
	}, []);
	function postUser(person) {
		const promise = fetch("http://localhost:8000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(person)
		});

		return promise;
	}
	function updateList(person) {
		postUser(person)
			.then((res) => {
				if(res.status === 201){
					return res.json();
				}
			})
		  .then((updatedPerson) => {
			if(updatedPerson){
				setCharacters([...characters, updatedPerson])
			}
		  } 
		  )
		  .catch((error) => {
			console.log(error);
		  });
	  }
	return (
		<div className="container">
			<Table
				characterData={characters}
				removeCharacter={removeOneCharacter}
			/>
			<Form handleSubmit={updateList} />
		</div>
	);
}

export default MyApp;