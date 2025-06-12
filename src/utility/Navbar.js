export default function Navbar() {
    return (
        <>
            <header className='Navbar'>
                <img src="/elements/logo.svg" alt="Logo" width="130px"
                    height="50px"></img>

                <ol className='Paths'>
                    <ul>
                        <button>Vechile</button> 
                    </ul>
                    <ul>
                        <button>Energy</button> 
                    </ul><ul>
                        <button>Charging</button> 
                    </ul><ul>
                        <button>Discover</button> 
                    </ul><ul>
                        <button>Shop</button> 
                    </ul>
                </ol>
                <ol>

                </ol>
            </header>

        </>
    );
}