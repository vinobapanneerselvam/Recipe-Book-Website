class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        console.log(`Inserting word: ${word}`);
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        console.log(`Inserted word: ${word}`);
    }

    search(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                console.log(`No matches found for prefix: ${prefix}`);
                return [];
            }
            node = node.children[char];
        }
        return this._findWords(node, prefix);
    }

    _findWords(node, prefix) {
        let results = [];
        if (node.isEndOfWord) {
            results.push(prefix);
        }
        for (let char in node.children) {
            results = results.concat(this._findWords(node.children[char], prefix + char));
        }
        return results;
    }
}

// Create a Trie instance and populate it with recipes
const recipeTrie = new Trie();
const recipeList = [
    { name: 'Butter Chicken', description: 'A rich and creamy chicken curry.', image: 'images/butter-chicken.jpg' },
    { name: 'Paneer Tikka', description: 'Spicy grilled paneer cubes.', image: 'images/paneer-tikka.jpg' },
    { name: 'Chicken Biryani', description: 'A flavorful and aromatic rice dish with chicken.', image: 'images/chicken-biryani.jpg' },
    { name: 'Chole Bhature', description: 'Spicy chickpea curry served with fried bread.', image: 'images/chole-bhature.jpg' },
    { name: 'Palak Paneer', description: 'Spinach and paneer curry.', image: 'images/palak-paneer.jpg' },
    { name: 'Dal Makhani', description: 'Creamy and buttery lentil curry.', image: 'images/dal-makhani.jpg' },
    { name: 'Aloo Gobi', description: 'Potato and cauliflower curry.', image: 'images/aloo-gobi.jpg' },
    { name: 'Rogan Josh', description: 'Spicy and aromatic lamb curry.', image: 'images/rogan-josh.jpg' },
    { name: 'Pani Puri', description: 'Crispy puris filled with spicy water and tamarind chutney.', image: 'images/pani-puri.jpg' },
    { name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes and peas.', image: 'images/samosa.jpg' },
    { name: 'Dosa', description: 'Thin and crispy rice crepes served with chutney and sambar.', image: 'images/dosa.jpg' },
    { name: 'Idli', description: 'Steamed rice cakes served with chutney and sambar.', image: 'images/idli.jpg' },
    { name: 'Vada Pav', description: 'Spicy potato fritters served in a bun.', image: 'images/vada-pav.jpg' },
    { name: 'Pulao', description: 'Aromatic rice dish cooked with vegetables and spices.', image: 'images/pulao.jpg' },
    { name: 'Rajma', description: 'Kidney bean curry cooked in a spiced tomato gravy.', image: 'images/rajma.jpg' },
    { name: 'Kachori', description: 'Spiced lentil or pea-filled pastries.', image: 'images/kachori.jpg' },
    { name: 'Bhindi Masala', description: 'Spicy and tangy okra stir-fry.', image: 'images/bhindi-masala.jpg' },
    { name: 'Lassi', description: 'Cool and refreshing yogurt drink.', image: 'images/lassi.jpg' },
    { name: 'Chappati', description: 'Soft and fluffy whole wheat bread.', image: 'images/chappati.jpg' },
    { name: 'Gulab Jamun', description: 'Sweet and syrupy deep-fried dough balls.', image: 'images/gulab-jamun.jpg' }
];

// Insert recipes into the Trie
recipeList.forEach(recipe => {
    recipeTrie.insert(recipe.name);
    addRecipeToUI(recipe);
});

// Function to dynamically search recipes using Trie
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.trim();
    const results = recipeTrie.search(query);
    displaySearchResults(results);
});

// Display search results in the UI
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.innerHTML = '<li>No recipes found</li>';
    } else {
        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result;
            resultsContainer.appendChild(li);
        });
    }
}

// Add new recipe and insert it into the Trie
document.getElementById('add-recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('recipe-name').value;
    const description = document.getElementById('recipe-description').value;
    const image = document.getElementById('recipe-image').value;

    const recipe = { name, description, image };
    recipeList.push(recipe);
    recipeTrie.insert(name); // Insert into Trie
    console.log(`Added recipe: ${name}`);
    addRecipeToUI(recipe);
    clearForm();
});

// Add recipe to UI
function addRecipeToUI(recipe) {
    const recipeContainer = document.getElementById('recipe-list');
    const recipeBox = document.createElement('div');
    recipeBox.className = 'box';

    recipeBox.innerHTML = `
        <div class="image">
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="share">
                <a href="#" class="fas fa-search"></a>
                <a href="#" class="fas fa-share"></a>
                <a href="#" class="fas fa-link"></a>
            </div>
        </div>
        <div class="content">
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <a href="#" class="btn">View Recipe</a>
        </div>
    `;
    recipeContainer.appendChild(recipeBox);
}

function clearForm() {
    document.getElementById('add-recipe-form').reset();
}
