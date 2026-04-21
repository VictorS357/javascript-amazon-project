import { Product, Clothing, Appliance } from "../../data/products.js";

describe('test suite: Product', () => {
  it('works with an aleatory product', () => {
    const product1 = new Product({
      id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      image: "images/products/6-piece-white-dinner-plate-set.jpg",
      name: "6 Piece White Dinner Plate Set",
      rating: {
        stars: 4,
        count: 37
      },
      priceCents: 2067,
      keywords: [
        "plates",
        "kitchen",
        "dining"
      ]
    });

    expect(product1.id).toEqual("3ebe75dc-64d2-4137-8860-1f5a963e534b");
    expect(product1.image).toEqual("images/products/6-piece-white-dinner-plate-set.jpg");
    expect(product1.name).toEqual("6 Piece White Dinner Plate Set");
    expect(product1.getStarsUrl()).toEqual('src="images/ratings/rating-40.png">');
    expect(product1.rating.count).toEqual(37);
    expect(product1.getPrice()).toEqual('$20.67');
    expect(product1.extraInfoHTML()).toEqual('');
  });
});

describe('test suite: Clothing', () => {
  it('should not work with an aleatory product', () => {
    const product1 = new Clothing({
      id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      image: "images/products/6-piece-white-dinner-plate-set.jpg",
      name: "6 Piece White Dinner Plate Set",
      rating: {
        stars: 4,
        count: 37
      },
      priceCents: 2067,
      keywords: [
        "plates",
        "kitchen",
        "dining"
      ],
      type: 'product',
      sizeCharLink: undefined
    });

    expect(product1.id).toEqual("3ebe75dc-64d2-4137-8860-1f5a963e534b");
    expect(product1.image).toEqual("images/products/6-piece-white-dinner-plate-set.jpg");
    expect(product1.name).toEqual("6 Piece White Dinner Plate Set");
    expect(product1.getStarsUrl()).toEqual('src="images/ratings/rating-40.png">');
    expect(product1.rating.count).toEqual(37);
    expect(product1.getPrice()).toEqual('$20.67');
    expect(product1.extraInfoHTML()).toContain(undefined);
    expect(product1.type).not.toEqual('clothing');
    expect(product1.sizeChartLink).toEqual(undefined);
  });
  
  it('should work with a clothing', () => {
    const clothing1 = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });

    expect(clothing1.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(clothing1.image).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg");
    expect(clothing1.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(clothing1.getStarsUrl()).toEqual('src="images/ratings/rating-45.png">');
    expect(clothing1.rating.count).toEqual(56);
    expect(clothing1.getPrice()).toEqual('$7.99');
    expect(clothing1.extraInfoHTML()).toContain("images/clothing-size-chart.png");
    expect(clothing1.type).toEqual('clothing');
    expect(clothing1.sizeChartLink).toEqual("images/clothing-size-chart.png");
  });
});


describe('test suite: Appliance', () => {
  it('should not work with an aleatory product', () => {
    const product1 = new Appliance({
      id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      image: "images/products/6-piece-white-dinner-plate-set.jpg",
      name: "6 Piece White Dinner Plate Set",
      rating: {
        stars: 4,
        count: 37
      },
      priceCents: 2067,
      keywords: [
        "plates",
        "kitchen",
        "dining"
      ],
      type: 'product',
      instructionsLink: undefined,
      warrantyLink: undefined
    });

    expect(product1.id).toEqual("3ebe75dc-64d2-4137-8860-1f5a963e534b");
    expect(product1.image).toEqual("images/products/6-piece-white-dinner-plate-set.jpg");
    expect(product1.name).toEqual("6 Piece White Dinner Plate Set");
    expect(product1.getStarsUrl()).toEqual('src="images/ratings/rating-40.png">');
    expect(product1.rating.count).toEqual(37);
    expect(product1.getPrice()).toEqual('$20.67');
    expect(product1.extraInfoHTML()).toContain(undefined);
    expect(product1.type).not.toEqual('appliance');
    expect(product1.instructionsLink).toEqual(undefined);
    expect(product1.warrantyLink).toEqual(undefined);
  });

  it('should work with an aplliance', () => {
    const appliance1 = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"
    });

    expect(appliance1.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
    expect(appliance1.image).toEqual("images/products/black-2-slot-toaster.jpg");
    expect(appliance1.name).toEqual("2 Slot Toaster - Black");
    expect(appliance1.getStarsUrl()).toEqual('src="images/ratings/rating-50.png">');
    expect(appliance1.rating.count).toEqual(2197);
    expect(appliance1.getPrice()).toEqual('$18.99');
    expect(appliance1.extraInfoHTML()).toContain("images/appliance-instructions.png");
    expect(appliance1.extraInfoHTML()).toContain("images/appliance-warranty.png");
    expect(appliance1.type).toEqual('appliance');
    expect(appliance1.instructionsLink).toEqual("images/appliance-instructions.png");
    expect(appliance1.warrantyLink).toEqual("images/appliance-warranty.png");
  });
});


