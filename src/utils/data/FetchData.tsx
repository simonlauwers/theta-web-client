const fetchData = async (endpoint : string) => {
    const result = await fetch("http://localhost:8080/" + endpoint);
    return result.json();
}

export default fetchData