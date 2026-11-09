import fs from 'node:fs'
const lines = fs.readFileSync('docs/original-guide.txt', 'utf8').split(/\r?\n/)
const extract = (heading, next) => {
 const start = lines.indexOf(heading, 5) + 1
 const end = lines.findIndex((line, i) => i >= start && line.startsWith(next))
 return lines.slice(start, end).filter(Boolean)
}
const clean = text => text.replace(/â€™/g, "'").replace(/â€“/g, '–').replace(/Â/g, '')
const manual = 'https://www.merckvetmanual.com/dog-owners/introduction-to-dogs/description-of-dogs'
const facts = extract('100 Dog Facts', '100 Good Foods for Dogs').map((text, i) => ({ id: `fact-${i+1}`, original: clean(text), text: clean(text), topic: 'Life & behavior', source: manual }))
const revise = (numbers, text, source = manual, topic = 'Body & senses') => numbers.forEach(n => Object.assign(facts[n-1], { text, source, topic, corrected: true }))
revise([1], 'Dogs have a much more sensitive sense of smell than people; there is no single multiplier that describes every scent or every dog.')
revise([2,78], 'Dogs can learn spoken cues and object names, but vocabulary varies widely with the individual and their training.')
revise([3,34,87], 'Dogs have different strengths in learning and problem solving. Comparing every dog to a particular human age or assigning one universal intelligence ranking is misleading.')
revise([5], 'Dogs have fewer taste buds than people and rely heavily on smell when investigating food.')
revise([6], 'Moisture helps a dog collect scent particles. A wet or dry nose by itself is not a reliable health test.')
revise([7,84], 'Specially trained dogs have been studied for detecting disease-related odors. They do not replace medical screening or a clinical diagnosis.')
revise([9,56], 'Dogs have sweat glands in their paw pads, but panting is their main way to release body heat.')
revise([12,33], 'Basenjis are known for an unusual yodel-like vocalization rather than a typical repeated bark; they are not silent.', 'https://images.akc.org/pdf/breeds/standards/Basenji.pdf', 'Breed stories')
revise([13,39], 'Greyhounds are exceptionally fast sprinters, although an individual dog’s speed depends on fitness, conditions, and measurement.', 'https://www.akc.org/dog-breeds/greyhound/', 'Breed stories')
revise([15,68,120], 'Scent hounds can follow odor trails, but how far or how long a scent remains detectable depends on the environment, training, and individual dog.')
revise([16,81], 'Chihuahuas are among the smallest dogs, while Mastiffs are among the heaviest. Height and weight are different measures of size.', 'https://www.akc.org/dog-breeds/mastiff/', 'Breed stories')
revise([17,82], 'Dogs see colors, especially blues and yellows, but distinguish reds and greens differently from people.', 'https://www.akc.org/expert-advice/health/can-dogs-see-color/')
revise([20], 'A dog’s resting heart rate varies with size, age, excitement, and health; one range does not describe every dog.')
revise([21], 'Labrador Retrievers are well-known sporting dogs with a long history of retrieving work.', 'https://www.akc.org/dog-breeds/labrador-retriever/', 'Breed stories')
revise([22], 'Dogs experience REM sleep. Twitching or quiet vocalizing during sleep can occur; not every movement tells us what a dog is dreaming about.')
revise([23], 'Bite force varies with the dog and how it is measured. A single pressure value does not describe every dog’s bite.')
revise([24], 'Dogs were domesticated thousands of years ago. Researchers continue to study exactly when and where that process began.')
revise([26,62], 'Some dogs experience distress when separated from their people. Separation-related behavior deserves patient support and, when needed, professional assessment.', 'https://www.merckvetmanual.com/dog-owners/behavior-of-dogs/behavior-problems-of-dogs', 'Life & behavior')
revise([29], 'Protective behavior varies between individuals. Teach calm responses and use qualified, reward-based help rather than encouraging aggression.', 'https://avsab.org/resources/position-statements/', 'Life & behavior')
revise([31,80], 'Some Golden Retrievers work as therapy dogs. Suitability depends on the individual dog’s health, temperament, and training.', 'https://www.akc.org/dog-breeds/golden-retriever/', 'Breed stories')
revise([32,95], 'A typical normal body temperature for dogs is about 101–102.5°F (38.3–39.2°C).', 'https://www.merckvetmanual.com/multimedia/table/normal-physiological-values-for-dogs')
revise([36], 'Dogs can retain learned associations and skills. Memory performance depends on the task, experience, age, and individual.')
revise([37,38], 'Lifespan varies considerably. Smaller dogs tend to live longer than giant breeds, but breed and individual health also matter.')
revise([41,55], 'Saint Bernards have a history of assisting alpine rescue work around the Great St. Bernard Hospice.', 'https://www.akc.org/dog-breeds/saint-bernard/', 'Breed stories')
revise([44], 'Reverse sneezing is a series of rapid inward snorts. New, frequent, or distressing episodes should be assessed by a veterinarian.', 'https://www.merckvetmanual.com/dog-owners/lung-and-airway-disorders-of-dogs', 'Body & senses')
revise([48], 'Whiskers are sensitive touch hairs that help dogs detect nearby objects and movement.')
revise([49,74], 'A complete set of permanent adult dog teeth normally contains 42 teeth; missing or abnormal teeth can occur.')
revise([51], 'Not every dog can swim safely. Introduce water gradually, supervise closely, and use a properly fitted canine life jacket when appropriate.', 'https://www.aaha.org/resources/dive-into-safety-water-safety-tips-for-pets/', 'Life & behavior')
revise([52], 'French Bulldogs are compact companion dogs with short muzzles; take particular care with heat and strenuous activity.', 'https://www.akc.org/dog-breeds/french-bulldog/', 'Breed stories')
revise([53], 'Beagles are compact scent hounds developed to work in packs.', 'https://www.akc.org/dog-breeds/beagle/', 'Breed stories')
revise([57,98], 'Dalmatian puppies are usually born with white coats and develop their spots later; some are born with larger colored patches.', 'https://www.akc.org/dog-breeds/dalmatian/', 'Breed stories')
revise([70], 'Balance is supported by the vestibular system, including structures in the inner ear—not by specialized ear glands.')
revise([72], 'Domestic dogs and modern wolves share ancestry. Domestication has also produced important differences in behavior and development.')
revise([73], 'Paw pads help cushion a dog’s steps and provide traction. Paw prints should not be presented as a proven identification system like human fingerprints.')
revise([77], 'Positive interaction with dogs can support human well-being, but benefits vary and do not replace medical care.', 'https://newsinhealth.nih.gov/2018/02/power-pets', 'Life & behavior')
revise([79,111], 'Dogs respond to human voices, posture, and expressions. Read the whole interaction rather than assuming a dog understands every human emotion.')
revise([83], 'A wagging tail can accompany excitement, anxiety, or tension as well as friendliness. Read the dog’s whole body and the situation.', 'https://www.akc.org/expert-advice/training/how-to-read-dog-body-language/', 'Life & behavior')
revise([86], 'Chihuahuas are tiny companion dogs that still need exercise, enrichment, and positive social experiences.', 'https://www.akc.org/dog-breeds/chihuahua/', 'Breed stories')
revise([92], 'Service dogs perform trained disability-related tasks. Therapy dogs and emotional support animals have different roles.', 'https://www.akc.org/expert-advice/training/service-working-therapy-emotional-support-dogs/', 'Life & behavior')
revise([93], 'Great Danes are among the tallest breeds. Breed height is measured at the shoulder, not at the top of the head.', 'https://www.akc.org/dog-breeds/great-dane/', 'Breed stories')
revise([94], 'Allergies in dogs can involve itching, ear problems, or digestive signs. Similar symptoms have other causes, so veterinary assessment matters.', 'https://www.merckvetmanual.com/dog-owners/skin-disorders-of-dogs', 'Body & senses')
revise([100,102], 'No dog breed is completely hypoallergenic. Low-shedding dogs can still produce allergens in dander and saliva.', 'https://www.akc.org/expert-advice/dog-breeds/do-hypoallergenic-dog-exist/', 'Body & senses')
revise([105], 'Dogs can use nutrients from animal and plant ingredients, but a safe diet must be complete and balanced for the individual.', 'https://vcahospitals.com/know-your-pet/vegetarian-diets-for-dogs', 'Life & behavior')
revise([107], 'Dogs can be trained for odor detection and assistance tasks. Seizure response is distinct from reliably predicting a seizure.', 'https://www.akc.org/expert-advice/training/service-working-therapy-emotional-support-dogs/', 'Life & behavior')
revise([108], 'Basenjis are often described as independent and alert. Their unusual voice does not mean they are always quiet.', 'https://www.akc.org/dog-breeds/basenji/', 'Breed stories')
revise([115], 'Dogs can become overweight when calorie intake exceeds their needs. Portions, treats, activity, and health all contribute.', 'https://healthtopics.vetmed.ucdavis.edu/health-topics/canine/treat-guidelines-dogs', 'Life & behavior')
revise([116], 'Dogs are adapted to see in dim light, but they cannot see in total darkness.', 'https://www.akc.org/expert-advice/health/can-dogs-see-in-the-dark/', 'Body & senses')
const breedNames = { 'Newfoundland':'newfoundland', 'Boxer':'boxer', 'Pug':'pug', 'Dalmatian':'dalmatian', 'Border Collie':'border-collie', 'Samoyed':'samoyed', 'Shiba Inu':'shiba-inu', 'Australian Shepherd':'australian-shepherd', 'Greyhound':'greyhound', 'Alaskan Malamute':'alaskan-malamute', 'Irish Wolfhound':'irish-wolfhound', 'Chow Chow':'chow-chow', 'Australian Cattle Dog':'australian-cattle-dog', 'Pembroke Welsh Corgi':'pembroke-welsh-corgi', 'German Shepherd':'german-shepherd-dog', 'Labrador Retriever':'labrador-retriever', 'Akita':'akita', 'Dachshund':'dachshund', 'Poodle':'poodle-standard', 'Great Dane':'great-dane', 'Cocker Spaniel':'cocker-spaniel', 'Basset Hound':'basset-hound', 'Pomeranian':'pomeranian', 'Beagle':'beagle', 'Bull Terrier':'bull-terrier', 'Yorkshire Terrier':'yorkshire-terrier', 'Siberian Husky':'siberian-husky' }
for (const fact of facts) if (!fact.corrected) {
 const match = Object.entries(breedNames).find(([name]) => fact.text.includes(name))
 if (match) { fact.source = `https://www.akc.org/dog-breeds/${match[1]}/`; fact.topic = 'Breed stories' }
 else if (/hear|eyelid|teeth|nose|sweat/i.test(fact.text)) fact.topic = 'Body & senses'
}
const goodOriginal = extract('100 Good Foods for Dogs', '100 Bad Foods for Dogs')
const badOriginal = extract('100 Bad Foods for Dogs', 'Created by')
const goodNotes = [
['Occasional treat','Serve plain, fully cooked, skinless chicken; remove every bone.','human'],
['Occasional treat','Wash and cut into small pieces to reduce choking.','produce'],
['Occasional treat','Offer a few washed berries as an occasional treat.','produce'],
['Use caution','Check for xylitol (birch sugar); use only xylitol-free, plain peanut butter sparingly.','human'],
['Occasional treat','Cook until soft; offer plain pieces without seasonings.','human'],
['Occasional treat','Choose plain pumpkin, not sweetened or spiced pie filling.','produce'],
['Occasional treat','Serve plain, chopped beans without added salt or sauces.','produce'],
['Occasional treat','Fully cook and remove all bones; no seasoning.','human'],
['Occasional treat','Peel and offer a few small pieces; fruit adds sugar.','produce'],
['Occasional treat','Remove the core and seeds; cut flesh into small pieces.','produce'],
['Occasional treat','Plain cooked rice is an extra, not a complete diet.','human'],
['Occasional treat','Cook fully without butter, salt, or other seasoning.','human'],
['Use caution','High in oxalates; choose another vegetable for dogs prone to urinary stones.','kale'],
['Use caution','Only plain, xylitol-free yogurt; skip if dairy causes digestive upset.','human'],
['Occasional treat','Cook in water; avoid sweetened or flavored varieties.','human'],
['Occasional treat','Wash and cut into manageable pieces.','produce'],
['Occasional treat','Remove seeds and rind; offer small pieces of flesh.','produce'],
['Occasional treat','Remove skin and bones; cook fully without seasoning.','human'],
['Occasional treat','Serve plain, washed, and cut into small pieces.','produce'],
['Occasional treat','Remove the tough skin and core; offer a little flesh.','produce'],
['Occasional treat','Plain fresh, frozen, or cooked peas; avoid added salt.','produce'],
['Ask your vet','Not an essential supplement. Ask before adding seeds to a prescribed diet.','treats'],
['Avoid','Not a recommended treat; the pit can obstruct and fatty flesh can upset digestion.','avocado'],
['Avoid','Almonds are a poor treat choice because of choking and high-fat concerns.','human'],
['Use caution','Only ripe red flesh; keep green tomatoes, stems, and leaves away.','produce'],
['Use caution','Offer small plain cooked portions; may cause gas.','produce'],
['Ask your vet','Do not feed foraged plants; confirm species and suitability with your vet.','treats'],
['Use caution','Offer only small plain portions; large amounts can irritate digestion.','produce'],
['Use caution','Ask first for dogs with kidney or bladder stone history.','kale'],
['Use caution','Type and amount matter; do not use parsley as a supplement without advice.','kale'],
['Avoid','Cherry flesh is not the main hazard, but pits and plant parts make other fruits a better choice.','cherries'],
['Occasional treat','Remove seeds and rind; cut flesh into small pieces.','produce'],
['Ask your vet','Avoid dried or sweetened fruit; ask about fresh fig portions first.','treats'],
['Use caution','Identify the melon; offer only edible flesh without rind or seeds.','produce'],
['Occasional treat','Serve plain cooked flesh; remove tough skin and seeds.','produce'],
['Occasional treat','Chop into small pieces; long stalks can be difficult to chew.','produce'],
['Occasional treat','Cook fully, choose lean cuts, and remove bones and excess fat.','human'],
['Occasional treat','Cook fully; remove bones, excess fat, and seasoning.','human'],
['Use caution','Sugary and unnecessary; avoid for puppies or dogs with relevant medical conditions.','human'],
['Use caution','Use very small plain portions; fat may cause digestive upset.','human'],
['Use caution','Small plain portions only if dairy is tolerated; avoid high-fat products.','human'],
['Use caution','Hummus recipes may include garlic, salt, and excess fat. Plain cooked chickpeas are simpler.','human'],
['Use caution','Serve plain and ask first if your dog has a stone-forming history.','kale'],
['Use caution','Check for raisins, chocolate, xylitol, and added sugar; not a needed food.','human'],
['Use caution','Identify the vegetable; not all greens are suitable for every dog.','kale'],
['Use caution','Discard pit, stem, and leaves; ask about an appropriate portion of flesh.','produce'],
['Occasional treat','Cook plain and remove tough skin and seeds.','produce'],
['Occasional treat','Fully cook, remove every bone, and leave unseasoned.','human'],
['Use caution','Contains oxalates and other irritants; safer vegetables are available.','kale'],
['Use caution','Plain cooked pasta only, in small portions; avoid sauces and seasonings.','human'],
['Occasional treat','Cook fully; remove shell, head, and tail; no butter or seasoning.','human'],
['Occasional treat','Cook fully and carefully remove bones; no sauces.','human'],
['Use caution','Plain cooked pieces are easier to chew; avoid tough stalks and seasonings.','produce'],
['Use caution','Remove peel and seeds; offer a little plain ripe flesh.','produce'],
['Ask your vet','Ask about greens and portion size, especially with a prescribed diet.','treats'],
['Ask your vet','Not an essential supplement. Ask before adding seeds to a prescribed diet.','treats'],
['Use caution','Offer small plain cooked portions; may cause gas.','produce'],
['Ask your vet','Ask about suitability and portions; salad dressings are not appropriate.','treats']
]
const badNotes = [
['Toxic','Keep away; risk depends on cocoa content, amount, and dog size.','aspca'],
['Toxic','Allium vegetables can damage red blood cells, including cooked forms.','aspca'],
['Toxic','Garlic and garlic powder can damage red blood cells.','aspca'],
['Toxic','Can cause serious kidney injury; contact a veterinarian after ingestion.','aspca'],
['Toxic','Dried grapes can cause kidney injury; seek veterinary advice promptly.','aspca'],
['Toxic','Also called birch sugar; can cause low blood sugar and liver injury.','fda'],
['Toxic','Alcohol-containing drinks and foods can poison dogs.','aspca'],
['Toxic','Keep coffee, tea concentrates, energy drinks, and caffeine products away.','aspca'],
['Toxic','Can cause weakness, tremors, and other illness.','aspca'],
['Avoid','The pit can obstruct; fatty flesh is not a recommended treat.','avocado'],
['Choking / obstruction','Pits can obstruct; chewed pits and other plant parts add toxicity concerns.','cherries'],
['Choking / obstruction','Bones can splinter or obstruct the digestive tract.','aspca'],
['Toxic','Raw yeast dough can expand and produce alcohol inside the stomach.','fda'],
['Use caution','Excess salt can cause poisoning; keep salty snacks out of reach.','aspca'],
['Avoid','Raw fish can carry pathogens or parasites; use fully cooked boneless fish.','human'],
['Avoid','Remove seeds and core before offering apple flesh.','produce'],
['Choking / obstruction','Keep pits away; swallowed pits may obstruct and chewed kernels pose added risk.','produce'],
['Choking / obstruction','Keep the pit and plant parts away; do not offer whole plums.','produce'],
['Avoid','Do not offer mustard seeds or mustard condiments; choose plain foods.','poisons'],
['Toxic','Brewing hops can cause dangerous overheating; seek veterinary care immediately.','hops'],
['Toxic','Keep concentrated alcohol-based flavoring extracts out of reach.','aspca'],
['Toxic','Can cause weakness, tremors, and other illness.','aspca'],
['Choking / obstruction','Remove and discard pits; never offer whole stone fruits.','produce'],
['Use caution','Xylitol is toxic; other sweeteners are not automatically equally toxic. Check ingredients.','fda'],
['Use caution','Added sugar is unnecessary; excess treats add calories. Not inherently a poison.','treats'],
['Avoid','Avoid raw or green potatoes; plain cooked potato flesh is different.','potatoes'],
['Toxic','Green tomato plant parts contain compounds that can cause illness.','produce'],
['Avoid','Raw eggs can carry harmful bacteria; offer fully cooked egg instead.','aspca'],
['Avoid','Fatty, salty meats are poor treats and can trigger digestive problems.','aspca'],
['Toxic','Gum containing xylitol is dangerous; seek veterinary advice after ingestion.','fda'],
['Toxic','Large amounts can cause poisoning; do not offer nutmeg as a treat.','nutmeg'],
['Toxic','Rhubarb leaves are a toxic plant exposure; keep away.','rhubarb'],
['Avoid','Raw pork can carry pathogens; use fully cooked, plain, lean meat.','aspca'],
['Avoid','Avoid green unripe tomatoes; ripe red flesh is a different preparation.','produce'],
['Use caution','Many dogs poorly tolerate lactose; amount and product matter.','aspca'],
['Choking / obstruction','Cooked poultry bones can splinter; remove all bones.','aspca'],
['Preparation matters','Fruit skins are not all toxic. Identify the fruit; discard pits and unsuitable parts.','produce'],
['Avoid','Raw meat can expose dogs and people to pathogens.','aspca'],
['Avoid','Spicy peppers can irritate digestion; do not intentionally feed.','human'],
['Ask your vet','THC-containing products can poison dogs; hemp foods and CBD products are not interchangeable.','cannabis'],
['Avoid','Often salty and may contain garlic or onions; use plain cucumber instead.','produce'],
['Avoid','Gravy and sausage may be fatty, salty, or contain alliums.','aspca'],
['Avoid','Raw sprouts can carry bacteria; do not use as a routine treat.','raw'],
['Use caution','Check the label: xylitol is toxic; sugar-free does not identify every ingredient.','fda'],
['Preparation matters','Plain tomato paste is not automatically toxic; avoid added alliums, salt, and seasonings.','produce'],
['Choking / obstruction','The cob can obstruct; do not let a dog chew or swallow it.','human'],
['Toxic','Contains chocolate compounds harmful to dogs; seek advice after ingestion.','aspca'],
['Avoid','Mold-ripened cheeses can pose risks; use safer treats.','cheese'],
['Use caution','Not a useful staple; check for chocolate, raisins, and xylitol.','fda'],
['Avoid','Spices and sauces may irritate digestion or contain harmful ingredients.','human'],
['Use caution','Fat and lactose may upset digestion; not a recommended routine treat.','aspca'],
['Use caution','Excess salt can be harmful; choose low-salt dog-appropriate treats.','aspca'],
['Preparation matters','Frozen is not inherently unsafe. Ingredients, choking risk, and storage determine safety.','produce'],
['Use caution','Processed cheese products may be salty and fatty; check ingredients.','human'],
['Toxic','Alcohol-containing drinks and foods can poison dogs.','aspca'],
['Use caution','Fat and lactose can cause digestive upset; avoid rich portions.','aspca'],
['Toxic','Gum containing xylitol is dangerous; seek veterinary advice after ingestion.','fda'],
['Avoid','A salty, fatty processed meat; may also contain garlic or other seasonings.','human'],
['Choking / obstruction','Keep pits away; obstruction and chewed-kernel risks depend on the fruit.','produce'],
['Avoid','Poor routine treats because of salt, fat, and choking risk, even when cooked.','human'],
['Preparation matters','Plain fully cooked potato is not automatically unsafe because it has skin; avoid green parts.','potatoes'],
['Avoid','Spoiled dairy can cause illness; discard it.','human']
]
const sources = {
 aspca:'https://www.aspca.org/pet-care/aspca-poison-control/people-foods-avoid-feeding-your-pets',
 fda:'https://www.fda.gov/animal-veterinary/animal-health-literacy/potentially-dangerous-items-your-pet',
 human:'https://www.akc.org/expert-advice/nutrition/human-foods-dogs-can-and-cant-eat/',
 produce:'https://www.akc.org/expert-advice/nutrition/fruits-vegetables-dogs-can-and-cant-eat/',
 treats:'https://healthtopics.vetmed.ucdavis.edu/health-topics/canine/treat-guidelines-dogs',
 kale:'https://www.akc.org/expert-advice/nutrition/can-dogs-eat-kale/',
 avocado:'https://www.akc.org/expert-advice/nutrition/can-dogs-eat-avocado/',
 cherries:'https://www.akc.org/expert-advice/nutrition/can-dogs-have-cherries/',
 potatoes:'https://www.akc.org/expert-advice/nutrition/can-dogs-eat-potatoes/',
 poisons:'https://www.petpoisonhelpline.com/poisons/',
 hops:'https://www.petpoisonhelpline.com/poison/hops/',
 nutmeg:'https://www.petpoisonhelpline.com/pet-safety-tips/nutmeg-cinnamon-toxicity/',
 rhubarb:'https://www.petpoisonhelpline.com/poison/rhubarb/',
 cannabis:'https://www.petpoisonhelpline.com/poison/marijuana/',
 raw:'https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-raw-pet-food-diets-can-be-dangerous-you-and-your-pet',
 cheese:'https://www.akc.org/expert-advice/nutrition/can-dogs-eat-cheese/'
}
const food = (originals, notes, prefix) => {
 if (originals.length !== notes.length) throw Error(`${prefix}: missing review notes (${originals.length} originals, ${notes.length} notes)`)
 const nameOverrides = { 'good-23':'Avocado', 'good-24':'Almonds', 'good-31':'Cherries', 'bad-61':'Cooked potatoes and skins' }
 return originals.map((original,i) => ({id:`${prefix}-${i+1}`,original:clean(original),name:nameOverrides[`${prefix}-${i+1}`] ?? clean(original),status:notes[i][0],note:notes[i][1],source:sources[notes[i][2]]}))
}
const result = { facts, goodFoods:food(goodOriginal,goodNotes,'good'), badFoods:food(badOriginal,badNotes,'bad') }
fs.writeFileSync('src/knowledge.json', JSON.stringify(result,null,2)+'\n')
console.log(`Restored ${facts.length} facts, ${result.goodFoods.length} good-food entries, and ${result.badFoods.length} bad-food entries.`)
