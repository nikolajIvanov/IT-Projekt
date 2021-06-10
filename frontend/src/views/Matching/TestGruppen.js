import GroupListElement from './Sections/GroupListElement'
const gruppen = [
    {
        beschreibung: 'Python',
        details: ' In dieser Gruppe lernst du die Python Grundlagen',
        infos: 'Mitglieder-Ican 14 / Schneller Lerner / Programmieren',
        tagIcon1: 'Programmieren',
        tagIcon2: 'Grundlagen',
    },
        {
        beschreibung: 'Marketing',
        details: ' In dieser Gruppe lernst du Marketingn Grundlagen',
        infos: 'Mitglieder-Ican 14 / Schneller Lerner / Marketing',
        tagIcon1: 'Marketing',
        tagIcon2: 'Stingel',
    },
        {
        beschreibung: 'Data Science',
        details: ' In dieser Gruppe lernst du Data Science',
        infos: 'Mitglieder-Ican 14 / Schneller Lerner / Data Science',
        tagIcon1: 'Daten',
        tagIcon2: 'WI7',
    }
]

const person = [
    {
        name: 'Nikolaj',
        bild: ' In dieser Gruppe lernst du die Python Grundlagen',
        beschreibung: 'Ich heiße nicht Benito',
        semester: 4,
        studiengang: 'Wirtschaftsinformatik',
        lerninteressen: 'Lerninteressen',
        suche: 'Web-Technologie',
        lerntyp: 'Motorisch'
    },
        {
        name: 'Benito',
        bild: ' In dieser Gruppe lernst du die Python Grundlagen',
        beschreibung: 'Ich heiße nicht Benito',
        semester: 4,
        studiengang: 'Wirtschaftsinformatik',
        lerninteressen: 'Lerninteressen',
        suche: 'Web-Technologie',
        lerntyp: 'Motorisch'
    },
        {
        name: 'Ardit',
        bild: ' In dieser Gruppe lernst du die Python Grundlagen',
        beschreibung: 'Ich heiße nicht Benito',
        semester: 4,
        studiengang: 'Wirtschaftsinformatik',
        lerninteressen: 'Lerninteressen',
        suche: 'Web-Technologie',
        lerntyp: 'Motorisch'
    }
]

const Gruppen = () => {
    return (
        <>
            {gruppen.map((gruppe) =>(<GroupListElement beschreibung={gruppe.beschreibung}
            details={gruppe.details} infos={gruppe.infos} tagIcon1={gruppe.tagIcon1}
            tagIcon2={gruppe.tagIcon2}/>))}
        </>
    )
}

export default Gruppen