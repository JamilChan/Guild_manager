import { createContext, useState, useEffect } from "react";

const CharacterlistContext = createContext()

export default CharacterlistContext;

export const CharacterlistProvider = ({children}) => {

	let [submitList, setSubmitList] = useState([])
	let [wowAccounts, setWowAccounts] = useState([])
	let [guild, setGuild] = useState([])
	let [cardtitel, setCardtitel] = useState([])
	let [showSubmit, setShowSubmit] = useState(true)
	let [emptyMessage, setEmptyMessage] = useState("Can't find any characters")
	let [loading, setLoading] = useState(true)


	let contextData = {
		submitList: submitList,
		setSubmitList: setSubmitList,
		wowAccounts: wowAccounts,
		setWowAccounts: setWowAccounts,
		guild: guild,
		setGuild: setGuild,
		cardtitel: cardtitel,
		setCardtitel: setCardtitel,
		showSubmit: showSubmit,
		setShowSubmit: setShowSubmit,
		emptyMessage: emptyMessage,
		setEmptyMessage: setEmptyMessage,
	}

	useEffect(()=> {
		setShowSubmit(true)
		setSubmitList([])
		setGuild([])
		setLoading(false)
	}, [loading])

	return(
		<CharacterlistContext.Provider value={contextData}>
			{loading ? null : children}
		</CharacterlistContext.Provider>
	)
}