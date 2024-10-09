import { Animal, Application, Association, Family, User } from "../index.js";

main();

async function main() {
  await testUser();
  await testFamily();
  await testAssociation();
  await testAnimal();
  await testApplication();
}

async function testUser() {
    const users = await User.findAll();
    console.log(users);
}

async function testAnimal() {
    const animals = await Animal.findAll();
    console.log(animals);
}

async function testAssociation() {
    const associations = await Association.findAll();
    console.log(associations);
}

async function testFamily() {
    const families = await Family.findAll();
    console.log(families);
}

async function testApplication() {
    const applications = await Application.findAll();
    console.log(applications);
}