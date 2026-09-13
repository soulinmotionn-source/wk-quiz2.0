"""
trivia_civics.py
Generates 930 clean, distinct questions:
- General Knowledge (160 questions)
- History (160 questions)
- Geography (160 questions)
- USA Tests (160 questions)
- DMV Test (160 questions)
- License Plate Quiz (130 questions)
"""

def generate_geography_questions(build_q_fn):
    cat = "Geography"
    diffs = ["easy", "medium", "hard"]
    questions = []
    idx = 1

    # Subcat 1: US State Capitals (40 questions)
    us_capitals = [
        ("What is the capital city of California?", "Sacramento", ["Los Angeles", "San Francisco", "San Diego"], "Sacramento became the permanent capital of California in 1854."),
        ("What is the capital city of Texas?", "Austin", ["Houston", "Dallas", "San Antonio"], "Austin is the state capital of Texas, named after Stephen F. Austin."),
        ("What is the capital city of Florida?", "Tallahassee", ["Miami", "Orlando", "Jacksonville"], "Tallahassee is the capital of Florida, situated in the state panhandle."),
        ("What is the capital city of New York?", "Albany", ["New York City", "Buffalo", "Rochester"], "Albany has been the capital of New York State since 1797."),
        ("What is the capital city of Illinois?", "Springfield", ["Chicago", "Peoria", "Naperville"], "Springfield is the state capital of Illinois, famed as the home of Abraham Lincoln."),
        ("What is the capital city of Pennsylvania?", "Harrisburg", ["Philadelphia", "Pittsburgh", "Allentown"], "Harrisburg is the state capital of Pennsylvania, situated on the Susquehanna River."),
        ("What is the capital city of Washington state?", "Olympia", ["Seattle", "Spokane", "Tacoma"], "Olympia is the state capital of Washington, located on Puget Sound."),
        ("What is the capital city of Ohio?", "Columbus", ["Cleveland", "Cincinnati", "Dayton"], "Columbus is the state capital and most populous city in Ohio."),
        ("What is the capital city of Georgia?", "Atlanta", ["Savannah", "Augusta", "Macon"], "Atlanta is the capital and major metropolitan hub of Georgia."),
        ("What is the capital city of North Carolina?", "Raleigh", ["Charlotte", "Greensboro", "Durham"], "Raleigh is the state capital of North Carolina, part of the Research Triangle."),
        ("What is the capital city of Michigan?", "Lansing", ["Detroit", "Grand Rapids", "Ann Arbor"], "Lansing is the state capital of Michigan, located in the central Lower Peninsula."),
        ("What is the capital city of Arizona?", "Phoenix", ["Tucson", "Mesa", "Scottsdale"], "Phoenix is the capital of Arizona and the most populous state capital in the US."),
        ("What is the capital city of Colorado?", "Denver", ["Colorado Springs", "Aurora", "Boulder"], "Denver, known as the 'Mile High City', is the capital of Colorado."),
        ("What is the capital city of Massachusetts?", "Boston", ["Worcester", "Cambridge", "Springfield"], "Boston is the historic capital and largest city of Massachusetts."),
        ("What is the capital city of Virginia?", "Richmond", ["Virginia Beach", "Norfolk", "Arlington"], "Richmond is the historic capital of the Commonwealth of Virginia."),
        ("What is the capital city of Tennessee?", "Nashville", ["Memphis", "Knoxville", "Chattanooga"], "Nashville is the state capital of Tennessee, celebrated as 'Music City'."),
        ("What is the capital city of Indiana?", "Indianapolis", ["Fort Wayne", "Bloomington", "South Bend"], "Indianapolis is the capital and geographic center of Indiana."),
        ("What is the capital city of Missouri?", "Jefferson City", ["Kansas City", "St. Louis", "Springfield"], "Jefferson City is the state capital of Missouri, located on the Missouri River."),
        ("What is the capital city of Maryland?", "Annapolis", ["Baltimore", "Bethesda", "Silver Spring"], "Annapolis is the historic capital of Maryland and home of the US Naval Academy."),
        ("What is the capital city of Wisconsin?", "Madison", ["Milwaukee", "Green Bay", "Kenosha"], "Madison is the state capital of Wisconsin, situated between Lakes Mendota and Monona."),
        ("What is the capital city of Minnesota?", "Saint Paul", ["Minneapolis", "Duluth", "Rochester"], "Saint Paul is the state capital of Minnesota, forming the 'Twin Cities' with Minneapolis."),
        ("What is the capital city of Louisiana?", "Baton Rouge", ["New Orleans", "Shreveport", "Lafayette"], "Baton Rouge is the state capital of Louisiana, located on the Mississippi River."),
        ("What is the capital city of Alabama?", "Montgomery", ["Birmingham", "Mobile", "Huntsville"], "Montgomery is the state capital of Alabama, a key site of the Civil Rights Movement."),
        ("What is the capital city of Kentucky?", "Frankfort", ["Louisville", "Lexington", "Bowling Green"], "Frankfort is the state capital of Kentucky, located along the Kentucky River."),
        ("What is the capital city of Oregon?", "Salem", ["Portland", "Eugene", "Bend"], "Salem is the state capital of Oregon, located in the Willamette Valley."),
        ("What is the capital city of Oklahoma?", "Oklahoma City", ["Tulsa", "Norman", "Broken Arrow"], "Oklahoma City is the state capital and largest city in Oklahoma."),
        ("What is the capital city of Connecticut?", "Hartford", ["New Haven", "Stamford", "Bridgeport"], "Hartford is the state capital of Connecticut, known as the insurance capital of the world."),
        ("What is the capital city of Iowa?", "Des Moines", ["Cedar Rapids", "Davenport", "Iowa City"], "Des Moines is the state capital and largest city in Iowa."),
        ("What is the capital city of Utah?", "Salt Lake City", ["Provo", "Ogden", "St. George"], "Salt Lake City is the capital of Utah, located near the Great Salt Lake."),
        ("What is the capital city of Nevada?", "Carson City", ["Las Vegas", "Reno", "Henderson"], "Carson City is the state capital of Nevada, near Lake Tahoe."),
        ("What is the capital city of Arkansas?", "Little Rock", ["Fayetteville", "Fort Smith", "Springdale"], "Little Rock is the state capital of Arkansas, located on the Arkansas River."),
        ("What is the capital city of Mississippi?", "Jackson", ["Gulfport", "Biloxi", "Hattiesburg"], "Jackson is the state capital and largest city in Mississippi."),
        ("What is the capital city of Kansas?", "Topeka", ["Wichita", "Overland Park", "Kansas City"], "Topeka is the state capital of Kansas."),
        ("What is the capital city of New Mexico?", "Santa Fe", ["Albuquerque", "Las Cruces", "Rio Rancho"], "Santa Fe is the state capital of New Mexico and the oldest state capital in the US (founded 1610)."),
        ("What is the capital city of Nebraska?", "Lincoln", ["Omaha", "Bellevue", "Grand Island"], "Lincoln is the state capital of Nebraska, named in honor of Abraham Lincoln."),
        ("What is the capital city of West Virginia?", "Charleston", ["Huntington", "Morgantown", "Parkersburg"], "Charleston is the state capital and most populous city in West Virginia."),
        ("What is the capital city of Idaho?", "Boise", ["Meridian", "Nampa", "Idaho Falls"], "Boise is the state capital and largest city in Idaho."),
        ("What is the capital city of Hawaii?", "Honolulu", ["Hilo", "Kailua", "Kahului"], "Honolulu, located on the island of Oahu, is the state capital of Hawaii."),
        ("What is the capital city of Maine?", "Augusta", ["Portland", "Bangor", "Lewiston"], "Augusta is the state capital of Maine, located on the Kennebec River."),
        ("What is the capital city of Alaska?", "Juneau", ["Anchorage", "Fairbanks", "Sitka"], "Juneau is the capital of Alaska, accessible only by boat or aircraft.")
    ]

    for item in us_capitals:
        diff = diffs[(idx - 1) % 3]
        questions.append(build_q_fn(cat, "US State Capitals", diff, item[0], item[1], item[2], item[3], idx))
        idx += 1

    # Subcat 2: World Capitals (40 questions)
    world_capitals = [
        ("What is the capital city of Australia?", "Canberra", ["Sydney", "Melbourne", "Brisbane"], "Canberra was chosen as the federal capital of Australia in 1908 as a compromise between Sydney and Melbourne."),
        ("What is the capital city of Canada?", "Ottawa", ["Toronto", "Montreal", "Vancouver"], "Ottawa, situated in Ontario along the border with Quebec, was chosen by Queen Victoria as Canada's capital."),
        ("What is the capital city of Brazil?", "Brasilia", ["Rio de Janeiro", "Sao Paulo", "Salvador"], "Brasilia is the planned federal capital of Brazil, inaugurated in 1960 to replace Rio de Janeiro."),
        ("What is the capital city of Japan?", "Tokyo", ["Kyoto", "Osaka", "Yokohama"], "Tokyo has been the imperial capital of Japan since the Meiji Restoration in 1868."),
        ("What is the capital city of Germany?", "Berlin", ["Munich", "Frankfurt", "Hamburg"], "Berlin is the capital and largest city of Germany, reunified following the fall of the Berlin Wall."),
        ("What is the capital city of France?", "Paris", ["Marseille", "Lyon", "Bordeaux"], "Paris, situated on the Seine River, has served as the capital of France for over a millennium."),
        ("What is the capital city of Italy?", "Rome", ["Milan", "Florence", "Naples"], "Rome, known as the 'Eternal City', became the capital of unified Italy in 1871."),
        ("What is the capital city of the United Kingdom?", "London", ["Edinburgh", "Manchester", "Birmingham"], "London is the capital of the United Kingdom, standing on the River Thames."),
        ("What is the capital city of Spain?", "Madrid", ["Barcelona", "Seville", "Valencia"], "Madrid, located in the geographic center of the Iberian Peninsula, is Spain's capital."),
        ("What is the capital city of China?", "Beijing", ["Shanghai", "Guangzhou", "Hong Kong"], "Beijing is the historic and political capital of the People's Republic of China."),
        ("What is the capital city of India?", "New Delhi", ["Mumbai", "Kolkata", "Bengaluru"], "New Delhi was inaugurated as the capital of India in 1931, replacing Calcutta."),
        ("What is the capital city of Russia?", "Moscow", ["Saint Petersburg", "Novosibirsk", "Kazan"], "Moscow is the capital and largest metropolis of Russia."),
        ("What is the capital city of South Africa's executive branch?", "Pretoria", ["Cape Town", "Bloemfontein", "Johannesburg"], "South Africa has three capital cities: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial)."),
        ("What is the capital city of South Korea?", "Seoul", ["Busan", "Incheon", "Daegu"], "Seoul has been the historic capital of Korea for over 600 years."),
        ("What is the capital city of Egypt?", "Cairo", ["Alexandria", "Giza", "Luxor"], "Cairo is the capital of Egypt and the largest metropolitan area in the Arab world."),
        ("What is the capital city of Argentina?", "Buenos Aires", ["Cordoba", "Rosario", "Mendoza"], "Buenos Aires, situated on the Rio de la Plata estuary, is the capital of Argentina."),
        ("What is the capital city of Turkey?", "Ankara", ["Istanbul", "Izmir", "Antalya"], "Ankara became the capital of modern Turkey in 1923 under Mustafa Kemal Ataturk, replacing Istanbul."),
        ("What is the capital city of Mexico?", "Mexico City", ["Guadalajara", "Monterrey", "Cancun"], "Mexico City, built on the historic ruins of the Aztec capital Tenochtitlan, is Mexico's capital."),
        ("What is the capital city of Saudi Arabia?", "Riyadh", ["Jeddah", "Mecca", "Medina"], "Riyadh is the capital and financial hub of the Kingdom of Saudi Arabia."),
        ("What is the capital city of Thailand?", "Bangkok", ["Chiang Mai", "Phuket", "Pattaya"], "Bangkok is the vibrant capital city of the Kingdom of Thailand."),
        ("What is the capital city of Poland?", "Warsaw", ["Krakow", "Gdansk", "Wroclaw"], "Warsaw, located on the Vistula River, is the capital of Poland."),
        ("What is the capital city of Sweden?", "Stockholm", ["Gothenburg", "Malmo", "Uppsala"], "Stockholm, built across 14 islands on Lake Malaren, is Sweden's capital."),
        ("What is the capital city of Norway?", "Oslo", ["Bergen", "Trondheim", "Stavanger"], "Oslo, situated at the head of the Oslofjord, is the capital of Norway."),
        ("What is the capital city of Greece?", "Athens", ["Thessaloniki", "Patras", "Heraklion"], "Athens is the historic cradle of Western civilization and the capital of Greece."),
        ("What is the capital city of Portugal?", "Lisbon", ["Porto", "Coimbra", "Faro"], "Lisbon, situated at the mouth of the Tagus River, is the capital of Portugal."),
        ("What is the capital city of the Netherlands?", "Amsterdam", ["The Hague", "Rotterdam", "Utrecht"], "Amsterdam is the constitutional capital of the Netherlands, though the government sits in The Hague."),
        ("What is the capital city of Switzerland?", "Bern", ["Zurich", "Geneva", "Basel"], "Bern serves as the federal city and de facto capital of the Swiss Confederation."),
        ("What is the capital city of Austria?", "Vienna", ["Salzburg", "Innsbruck", "Graz"], "Vienna, located on the Danube River, is the cultural and political capital of Austria."),
        ("What is the capital city of Ireland?", "Dublin", ["Cork", "Galway", "Limerick"], "Dublin, situated on the east coast at the mouth of the River Liffey, is the capital of Ireland."),
        ("What is the capital city of New Zealand?", "Wellington", ["Auckland", "Christchurch", "Queenstown"], "Wellington is the southernmost national capital city in the world."),
        ("What is the capital city of Colombia?", "Bogota", ["Medellin", "Cali", "Cartagena"], "Bogota, situated in the high Andes plateau at 2,640 meters altitude, is Colombia's capital."),
        ("What is the capital city of Peru?", "Lima", ["Cusco", "Arequipa", "Trujillo"], "Lima, founded by Francisco Pizarro in 1535 on the Pacific coast, is Peru's capital."),
        ("What is the capital city of Chile?", "Santiago", ["Valparaiso", "Concepcion", "Antofagasta"], "Santiago, framed by the snow-capped Andes mountains, is Chile's capital."),
        ("What is the capital city of Kenya?", "Nairobi", ["Mombasa", "Kisumu", "Nakuru"], "Nairobi is the capital and major economic hub of Kenya in East Africa."),
        ("What is the capital city of Nigeria?", "Abuja", ["Lagos", "Kano", "Ibadan"], "Abuja was built as a planned federal capital in the center of Nigeria, replacing coastal Lagos in 1991."),
        ("What is the capital city of Vietnam?", "Hanoi", ["Ho Chi Minh City", "Da Nang", "Hai Phong"], "Hanoi, located on the Red River, is the capital of Vietnam."),
        ("What is the capital city of the Philippines?", "Manila", ["Cebu City", "Davao City", "Quezon City"], "Manila, located on Manila Bay on the island of Luzon, is the capital of the Philippines."),
        ("What is the capital city of Indonesia?", "Jakarta", ["Surabaya", "Bandung", "Medan"], "Jakarta, located on the northwest coast of Java, is the historic capital of Indonesia."),
        ("What is the capital city of Morocco?", "Rabat", ["Casablanca", "Marrakech", "Fes"], "Rabat, located on the Atlantic coast, is the administrative capital of Morocco."),
        ("What is the capital city of Finland?", "Helsinki", ["Espoo", "Tampere", "Turku"], "Helsinki, situated on the Gulf of Finland, is the capital of Finland.")
    ]

    for item in world_capitals:
        diff = diffs[(idx - 1) % 3]
        questions.append(build_q_fn(cat, "World Capitals", diff, item[0], item[1], item[2], item[3], idx))
        idx += 1

    # Subcat 3: Physical Geography (40 questions)
    physical_geo = [
        ("What is the deepest known location in Earth's oceans?", "Challenger Deep in the Mariana Trench", ["Puerto Rico Trench", "Java Trench", "Tonga Trench"], "Challenger Deep in the Mariana Trench descends to approximately 36,000 feet (11,000 meters) below sea level."),
        ("What is the longest river in the world by traditional geographical measurement?", "The Nile River", ["The Amazon River", "The Yangtze River", "The Mississippi River"], "The Nile River in northeastern Africa flows approximately 6,650 kilometers (4,130 miles)."),
        ("Which river discharges the largest volume of freshwater into the oceans on Earth?", "The Amazon River", ["The Congo River", "The Ganges River", "The Mississippi River"], "The Amazon River accounts for approximately 20% of the world's total river flow into oceans."),
        ("What is the highest mountain peak above sea level on Earth?", "Mount Everest", ["K2", "Kangchenjunga", "Lhotse"], "Mount Everest stands at 8,848.86 meters (29,031.7 feet) on the border of Nepal and China."),
        ("What is the largest hot desert on Earth by surface area?", "The Sahara Desert", ["The Arabian Desert", "The Gobi Desert", "The Kalahari Desert"], "The Sahara Desert in North Africa spans over 9.2 million square kilometers."),
        ("What is the largest desert overall on planet Earth?", "The Antarctic Desert", ["The Arctic Desert", "The Sahara Desert", "The Australian Desert"], "A desert is defined by low precipitation; the Antarctic ice sheet is the largest desert on Earth (14 million sq km)."),
        ("Which lake is the largest freshwater lake by surface area in the world?", "Lake Superior", ["Lake Victoria", "Lake Huron", "Lake Michigan"], "Lake Superior in North America covers approximately 82,100 square kilometers."),
        ("Which lake is the deepest and most voluminous freshwater lake on Earth?", "Lake Baikal", ["Lake Tanganyika", "Lake Superior", "Caspian Sea"], "Lake Baikal in Siberia holds over 20% of Earth's unfrozen surface freshwater and reaches 1,642 meters depth."),
        ("What is the largest enclosed inland body of water by surface area on Earth?", "The Caspian Sea", ["The Black Sea", "The Mediterranean Sea", "Lake Superior"], "The Caspian Sea covers 371,000 square kilometers and is classified as the world's largest inland lake or sea."),
        ("What is the name of the highest uninterrupted waterfall in the world?", "Angel Falls (Kerepakupai Meru)", ["Niagara Falls", "Victoria Falls", "Iguazu Falls"], "Angel Falls in Venezuela plunges 979 meters (3,212 feet) from the Auyan-tepui plateau."),
        ("Which mountain range forms the traditional geographical boundary between Europe and Asia?", "The Ural Mountains", ["The Caucasus Mountains", "The Alps", "The Carpathian Mountains"], "The Ural Mountains in Russia run north to south, delineating the conventional European-Asian border."),
        ("What geological feature is formed when a meandering river erodes through a narrow neck and leaves behind an abandoned curve?", "An oxbow lake", ["A caldera", "A fjord", "A sinkhole"], "Oxbow lakes form when meandering rivers take a straighter path, cutting off an old crescent-shaped river loop."),
        ("What is the term for a long, deep, narrow sea inlet bordered by steep glacial cliffs?", "A fjord", ["A delta", "An estuary", "An atoll"], "Fjords are carved by moving glaciers and subsequently flooded by seawater (prominent in Norway)."),
        ("What is the name of the ring of active volcanoes and seismic activity encircling the Pacific Basin?", "The Ring of Fire", ["The Mid-Atlantic Ridge", "The Alpine Fault", "The Great Rift Valley"], "The Pacific Ring of Fire hosts about 75% of Earth's active volcanoes and 90% of all earthquakes."),
        ("What type of plate tectonic boundary occurs where two continental plates slide horizontally past one another?", "Transform boundary", ["Divergent boundary", "Convergent boundary", "Subduction zone"], "Transform faults (like California's San Andreas Fault) involve lateral horizontal strike-slip motion."),
        ("What is the lowest dry-land elevation on the surface of the Earth?", "The shores of the Dead Sea", ["Death Valley", "Lake Eyre", "Qattara Depression"], "The shoreline of the Dead Sea in Jordan/Israel lies at approximately 430 meters (1,410 feet) below sea level."),
        ("What is the highest point in North America?", "Denali (Mount McKinley)", ["Mount Logan", "Mount Whitney", "Mount Rainier"], "Denali in Alaska rises to an elevation of 6,190 meters (20,310 feet) above sea level."),
        ("What is the longest continental mountain range in the world?", "The Andes Mountains", ["The Rocky Mountains", "The Himalayas", "The Great Dividing Range"], "The Andes stretch over 7,000 kilometers (4,350 miles) along the entire western coast of South America."),
        ("What is the highest point on the African continent?", "Mount Kilimanjaro", ["Mount Kenya", "Mount Stanley", "Ras Dashen"], "Mount Kilimanjaro in Tanzania is a dormant stratovolcano rising 5,895 meters (19,341 feet) above sea level."),
        ("What is the name of the world's largest coral reef ecosystem?", "The Great Barrier Reef", ["The Mesoamerican Reef", "The New Caledonia Barrier Reef", "The Red Sea Coral Reef"], "The Great Barrier Reef off Queensland, Australia, spans over 2,300 kilometers and is visible from space."),
        ("Which strait connects the Atlantic Ocean to the Mediterranean Sea?", "The Strait of Gibraltar", ["The Bosporus Strait", "The Strait of Malacca", "The Bab-el-Mandeb"], "The Strait of Gibraltar separates Spain from Morocco, linking the Atlantic to the Mediterranean."),
        ("Which narrow waterway connects the Black Sea to the Sea of Marmara?", "The Bosporus Strait", ["The Dardanelles", "The Suez Canal", "The Strait of Hormuz"], "The Bosporus Strait divides Istanbul between Europe and Asia, connecting the Black Sea to the Sea of Marmara."),
        ("What is the term for a ring-shaped coral reef that encloses a central lagoon?", "An atoll", ["A barrier reef", "A fringing reef", "A seamount"], "Atolls develop around subsiding oceanic volcanic islands, leaving a circular reef surrounding a lagoon."),
        ("What is the deepest lake in the United States?", "Crater Lake", ["Lake Tahoe", "Lake Superior", "Lake Chelan"], "Crater Lake in Oregon fills a volcanic caldera formed by Mount Mazama, reaching 594 meters (1,949 feet) depth."),
        ("Which atmospheric layer closest to Earth's surface contains the vast majority of clouds and weather phenomena?", "The troposphere", ["The stratosphere", "The mesosphere", "The thermosphere"], "The troposphere extends from sea level up to ~12 km and contains ~75% of the atmosphere's mass and almost all weather."),
        ("What is the geological term for molten rock beneath Earth's surface before it erupts?", "Magma", ["Lava", "Basalt", "Pumice"], "Molten rock under the crust is magma; upon erupting onto the surface, it is termed lava."),
        ("What type of rock is formed from the cooling and solidification of molten magma or lava?", "Igneous rock", ["Sedimentary rock", "Metamorphic rock", "Limestone"], "Igneous rocks (granite, basalt, obsidian) crystallize directly from cooling silicate melt."),
        ("What type of rock is formed through the accumulation and compaction of mineral or organic particles over time?", "Sedimentary rock", ["Igneous rock", "Metamorphic rock", "Plutonic rock"], "Sedimentary rocks (sandstone, limestone, shale) form from weathered sediment deposits."),
        ("What type of rock forms when existing rock is subjected to extreme heat and pressure without melting?", "Metamorphic rock", ["Igneous rock", "Sedimentary rock", "Volcanic ash"], "Metamorphism alters mineral crystal lattices (e.g., limestone transforms into marble; shale into slate)."),
        ("What is the name of the supercontinent that existed approximately 300 million years ago before continental drift?", "Pangaea", ["Gondwana", "Laurasia", "Rodinia"], "Pangaea assembled in the late Paleozoic and began rifting apart during the Mesozoic era."),
        ("What is the highest plateau in the world, often nicknamed the 'Roof of the World'?", "The Tibetan Plateau", ["The Colorado Plateau", "The Deccan Plateau", "The Altiplano"], "The Tibetan Plateau covers 2.5 million square kilometers at an average elevation exceeding 4,500 meters."),
        ("Which narrow passage connects the Persian Gulf to the Gulf of Oman and Arabian Sea?", "The Strait of Hormuz", ["The Strait of Malacca", "The Suez Canal", "The Bab-el-Mandeb"], "The Strait of Hormuz is the world's most critical oil transit chokepoint."),
        ("What is the term for a narrow strip of land connecting two larger land areas with water on both sides?", "An isthmus", ["A peninsula", "A strait", "An archipelago"], "An isthmus (like the Isthmus of Panama) joins two large land masses between bodies of water."),
        ("What is the term for a group or cluster of islands scattered in a body of water?", "An archipelago", ["An atoll", "An isthmus", "A cape"], "An archipelago (like Indonesia or the Philippines) comprises an island chain or cluster."),
        ("What is the largest island in the world by land area?", "Greenland", ["New Guinea", "Borneo", "Madagascar"], "Greenland covers over 2.16 million square kilometers, making it the largest non-continental island."),
        ("Which river flows through the Grand Canyon in the United States?", "The Colorado River", ["The Rio Grande", "The Snake River", "The Columbia River"], "The Colorado River eroded the Kaibab Plateau over millions of years to sculpt the Grand Canyon."),
        ("What is the largest bay by area in the world?", "The Bay of Bengal", ["Hudson Bay", "The Bay of Biscay", "Chesapeake Bay"], "The Bay of Bengal in the northeastern Indian Ocean spans over 2.17 million square kilometers."),
        ("What is the driest non-polar desert on Earth?", "The Atacama Desert", ["The Mojave Desert", "The Namib Desert", "The Thar Desert"], "The Atacama Desert in northern Chile receives virtually zero rainfall due to the Pacific rain-shadow effect."),
        ("Which African lake is the world's second-largest freshwater lake by surface area?", "Lake Victoria", ["Lake Tanganyika", "Lake Malawi", "Lake Chad"], "Lake Victoria spans 68,800 square kilometers, shared by Uganda, Kenya, and Tanzania."),
        ("What is the name of the tectonic fault line responsible for major earthquakes in California?", "The San Andreas Fault", ["The New Madrid Fault", "The Hayward Fault", "The Cascadia Subduction Zone"], "The San Andreas Fault is a right-lateral transform fault marking the Pacific and North American plate boundary.")
    ]

    for item in physical_geo:
        diff = diffs[(idx - 1) % 3]
        questions.append(build_q_fn(cat, "Physical Geography", diff, item[0], item[1], item[2], item[3], idx))
        idx += 1

    # Subcat 4: Nations & Territories (40 questions)
    nations = [
        ("Which country is completely landlocked by a single other country (an enclave)?", "Lesotho", ["Switzerland", "Bolivia", "Nepal"], "Lesotho is an independent sovereign enclave entirely surrounded by the Republic of South Africa."),
        ("Which country is the smallest independent sovereign state in the world by both area and population?", "Vatican City", ["Monaco", "Nauru", "San Marino"], "Vatican City covers just 0.49 square kilometers (121 acres) entirely within Rome, Italy."),
        ("Which country has the longest coastline in the world?", "Canada", ["Norway", "Indonesia", "Russia"], "Canada possesses over 202,080 kilometers of marine coastline along three oceans."),
        ("Which sovereign nation spans the greatest number of contiguous time zones on land?", "Russia", ["China", "Canada", "United States"], "Russia stretches across 11 contiguous time zones from Kaliningrad to Kamchatka."),
        ("How many official time zones does the mainland People's Republic of China officially observe?", "One single time zone (Beijing Time, UTC+8)", ["Three time zones", "Four time zones", "Five time zones"], "Despite spanning roughly 5,000 km longitudinally, China has officially observed a single time zone since 1949."),
        ("Which South American country is landlocked?", "Bolivia", ["Ecuador", "Uruguay", "Suriname"], "Bolivia and Paraguay are the two landlocked sovereign nations of South America."),
        ("Which African country was historically known as Abyssinia?", "Ethiopia", ["Sudan", "Somalia", "Eritrea"], "Ethiopia was known internationally as Abyssinia until the 20th century."),
        ("Which Southeast Asian country is the only one never colonized by European powers?", "Thailand", ["Vietnam", "Myanmar", "Malaysia"], "The Kingdom of Siam (Thailand) maintained independence by serving as a diplomatic buffer between British and French colonies."),
        ("Which European nation is divided into 26 sovereign federal cantons?", "Switzerland", ["Belgium", "Austria", "Germany"], "The Swiss Confederation is composed of 26 federal cantons with substantial local autonomy."),
        ("What is the official currency of the United Kingdom?", "Pound Sterling", ["Euro", "Crown", "Franc"], "The British pound sterling (GBP) is the world's oldest currency still in continuous circulation."),
        ("What is the official national currency of Japan?", "Yen", ["Won", "Yuan", "Ringgit"], "The yen (JPY) was established during the Meiji modernization in 1871."),
        ("What is the official currency of South Korea?", "Won", ["Yen", "Yuan", "Baht"], "The South Korean won (KRW) is subdivided into 100 jeon."),
        ("Which country is known as the 'Land of the Midnight Sun' because parts lie north of the Arctic Circle?", "Norway", ["Denmark", "Iceland", "Ireland"], "Norway's northern regions experience 24 hours of continuous daylight during the summer solstice."),
        ("Which country possesses the largest exclusive economic maritime zone in the world?", "France", ["United States", "Australia", "Russia"], "Due to its numerous overseas departments and territories across all oceans, France commands over 11.6 million sq km of EEZ."),
        ("Which two countries share the longest international land border in the world?", "The United States and Canada", ["Russia and China", "Argentina and Chile", "India and Bangladesh"], "The Canada-US border spans 8,891 kilometers (5,525 miles), including the Alaska border."),
        ("Which country has the world's highest population density among sovereign nations?", "Monaco", ["Singapore", "Bahrain", "Maldives"], "Monaco has over 19,000 inhabitants per square kilometer within its 2 square kilometer territory."),
        ("Which sovereign island nation lies closest to the Horn of Africa in the Indian Ocean?", "Madagascar", ["Seychelles", "Mauritius", "Comoros"], "Madagascar is the largest island in Africa and fourth-largest globally."),
        ("What is the only country that is also classified as a continent?", "Australia", ["Greenland", "Antarctica", "Madagascar"], "Australia is both an independent sovereign nation and a distinct geographic continent."),
        ("Which nation is composed of more than 17,000 islands along the equator?", "Indonesia", ["The Philippines", "Japan", "Maldives"], "Indonesia is the world's largest archipelago state, with over 17,500 islands."),
        ("Which European country is renowned for having no traffic lights or speed limits on sections of its Autobahn?", "Germany", ["Austria", "Switzerland", "Poland"], "Germany's federal Autobahn network famously maintains advisory speed sections without mandatory speed limits."),
        ("What is the primary official language spoken in Brazil?", "Portuguese", ["Spanish", "French", "Italian"], "Brazil was colonized by Portugal following the 1494 Treaty of Tordesillas, making Portuguese the national language."),
        ("Which nation's flag is the only national flag in the world that is not quadrilateral (rectangular or square)?", "Nepal", ["Switzerland", "Vatican City", "Bhutan"], "Nepal's flag is formed by two stacked pennant triangles representing the Himalayas and its religions."),
        ("Which two sovereign nations have strictly square national flags?", "Switzerland and Vatican City", ["Monaco and Indonesia", "Belgium and Germany", "Poland and Singapore"], "Switzerland and Vatican City are the only two UN-recognized states with official 1:1 square flags."),
        ("Which canal connects the Mediterranean Sea directly to the Red Sea?", "The Suez Canal", ["The Panama Canal", "The Kiel Canal", "The Corinth Canal"], "Opened in 1869, the Suez Canal in Egypt enables maritime transit between Europe and Asia without circumnavigating Africa."),
        ("Which canal cuts across an isthmus to connect the Atlantic and Pacific Oceans?", "The Panama Canal", ["The Suez Canal", "The Erie Canal", "The Grand Canal"], "Opened in 1914, the Panama Canal uses a system of locks to lift ships across the continental divide."),
        ("What is the official language of Egypt?", "Arabic", ["Coptic", "French", "English"], "Modern Standard Arabic is the official language of the Arab Republic of Egypt."),
        ("What is the national currency used in India?", "Indian Rupee", ["Rupiah", "Taka", "Rupee-cent"], "The Indian Rupee (INR) is the official currency, regulated by the Reserve Bank of India."),
        ("Which country operates the territory of Greenland under its realm?", "Denmark", ["Norway", "Iceland", "Canada"], "Greenland is an autonomous constituent country within the Kingdom of Denmark."),
        ("Which European microstate is nestled entirely in the Pyrenees mountains between France and Spain?", "Andorra", ["Liechtenstein", "San Marino", "Luxembourg"], "The Principality of Andorra is a sovereign co-principality in the eastern Pyrenees."),
        ("Which European microstate is landlocked between Switzerland and Austria along the Rhine River?", "Liechtenstein", ["Monaco", "Luxembourg", "Andorra"], "Liechtenstein is a doubly landlocked Alpine principality."),
        ("Which country has the city of Istanbul, historically located on two different continents?", "Turkey", ["Egypt", "Russia", "Cyprus"], "Istanbul is split by the Bosporus Strait, placing half of the city in Europe and half in Asia."),
        ("Which nation contains the famous historic ruin citadel of Machu Picchu?", "Peru", ["Bolivia", "Chile", "Ecuador"], "Machu Picchu is a 15th-century Inca citadel situated high in the Andes mountains of Peru."),
        ("What is the official currency of the People's Republic of China?", "Renminbi (Yuan)", ["Yen", "Won", "Baht"], "The official currency of China is the Renminbi ('people's currency'), with the primary unit being the Yuan."),
        ("Which country borders the most other sovereign nations by land (sharing 14 land borders)?", "China and Russia", ["Germany and France", "Brazil and Argentina", "India and Pakistan"], "Both China and Russia border 14 distinct recognized sovereign states on land."),
        ("What is the largest country in South America by both land area and population?", "Brazil", ["Argentina", "Colombia", "Peru"], "Brazil occupies nearly half the South American landmass and has over 215 million citizens."),
        ("Which country is located on the Iberian Peninsula along with Spain?", "Portugal", ["Italy", "France", "Greece"], "The Iberian Peninsula in southwestern Europe is predominantly shared by Spain and Portugal."),
        ("Which nation comprises the North Island and South Island separated by Cook Strait?", "New Zealand", ["Fiji", "Samoa", "Vanuatu"], "New Zealand consists of two main landmasses: Te Ika-a-Maui (North Island) and Te Waipounamu (South Island)."),
        ("What is the national currency of the Russian Federation?", "Ruble", ["Dinar", "Lira", "Kopek"], "The Russian ruble (RUB) is the official currency of Russia."),
        ("Which nation in East Africa has Nairobi as its capital?", "Kenya", ["Tanzania", "Uganda", "Rwanda"], "Nairobi is the capital of Kenya, known as the 'Green City in the Sun'."),
        ("Which country is home to the ancient rock-cut city of Petra?", "Jordan", ["Syria", "Lebanon", "Israel"], "Petra, the rose-red capital of the Nabataean Kingdom, is located in southern Jordan.")
    ]

    for item in nations:
        diff = diffs[(idx - 1) % 3]
        questions.append(build_q_fn(cat, "Nations & Territories", diff, item[0], item[1], item[2], item[3], idx))
        idx += 1

    return questions

print("Loaded generate_geography_questions.")
