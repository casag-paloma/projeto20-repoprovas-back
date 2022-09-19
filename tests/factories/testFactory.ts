import {faker} from "@faker-js/faker";

export async function testFactory() {
    return {
        "name": faker.lorem.words(2),
        "pdfUrl": faker.internet.url()
      }
}