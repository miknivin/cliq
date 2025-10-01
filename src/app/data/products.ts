const REFERENCE_IDS = {
  taxGroup: '68c01adcd95343f3a8914b9e',
  base: '68b193c14ad2d1b56b7c0f08',
  purchase: '68b193c14ad2d1b56b7c0f08',
  sales: '68b193c14ad2d1b56b7c0f08',
  stock: '68b193c14ad2d1b56b7c0f08',
  group: '68bebea8aa925c4b1cff7331',
  subGroup: '68bebea8aa925c4b1cff7331',
  vendor: '68b579360467f01e3b4ea958'
};


export const sampleProducts = [
  {
    basicProductInfo: {
      code: 'PRD001',
      name: 'Premium Laptop',
      otherLanguage: 'प्रीमियम लैपटॉप',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 15,
      pRate: 85000,
      cost: 75000,
      sRate: 90000,
      nRate: 95000,
      mrp: 100000,
      wRate: 80000
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 50,
      minimumStock: 10,
      maximumStock: 100,
      reOrderLevel: 15,
      reOrderQty: 25
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: false,
        autoEntry: true,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: true,
        serialNo: true
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Dell'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 5,
      addition: 3750,
      barcode: '1234567890123',
      barcodeMultiple: ['1234567890123', '1234567890124']
    }
  },
  {
    basicProductInfo: {
      code: 'PRD002',
      name: 'Wireless Mouse',
      otherLanguage: 'वायरलेस माउस',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 20,
      pRate: 400,
      cost: 350,
      sRate: 500,
      nRate: 550,
      mrp: 600,
      wRate: 450
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 100,
      minimumStock: 20,
      maximumStock: 200,
      reOrderLevel: 25,
      reOrderQty: 50
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: true,
        autoEntry: false,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: false,
        serialNo: false
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Logitech'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 10,
      addition: 35,
      barcode: '2345678901234'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD003',
      name: 'Mechanical Keyboard',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 25,
      pRate: 2500,
      cost: 2000,
      sRate: 3000,
      nRate: 3200,
      mrp: 3500,
      wRate: 2800
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 75,
      minimumStock: 15,
      maximumStock: 150,
      reOrderLevel: 20,
      reOrderQty: 30
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: false,
        autoEntry: true,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: true,
        serialNo: false
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Corsair'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 12,
      addition: 240,
      barcode: '3456789012345'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD004',
      name: '27-inch Monitor',
      otherLanguage: '27-इंच मॉनिटर',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 18,
      pRate: 18000,
      cost: 15000,
      sRate: 20000,
      nRate: 21000,
      mrp: 22000,
      wRate: 19000
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 30,
      minimumStock: 5,
      maximumStock: 60,
      reOrderLevel: 8,
      reOrderQty: 15
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: false,
        autoEntry: false,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: true,
        serialNo: true
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Samsung'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 8,
      addition: 1200,
      barcode: '4567890123456'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD005',
      name: 'Webcam HD',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 30,
      pRate: 1500,
      cost: 1200,
      sRate: 1800,
      nRate: 1900,
      mrp: 2000,
      wRate: 1600
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 120,
      minimumStock: 25,
      maximumStock: 250,
      reOrderLevel: 30,
      reOrderQty: 60
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: true,
        autoEntry: true,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: false,
        serialNo: false
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Logitech'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 15,
      addition: 180,
      barcode: '5678901234567'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD006',
      name: 'Bluetooth Headphones',
      otherLanguage: 'ब्लूटूथ हेडफोन',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 22,
      pRate: 2200,
      cost: 1800,
      sRate: 2500,
      nRate: 2700,
      mrp: 3000,
      wRate: 2300
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 80,
      minimumStock: 15,
      maximumStock: 160,
      reOrderLevel: 20,
      reOrderQty: 40
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: true,
        autoEntry: false,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: true,
        serialNo: false
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Sony'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 11,
      addition: 198,
      barcode: '6789012345678'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD007',
      name: 'External SSD 1TB',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 17,
      pRate: 7000,
      cost: 6000,
      sRate: 8000,
      nRate: 8500,
      mrp: 9000,
      wRate: 7500
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 45,
      minimumStock: 8,
      maximumStock: 90,
      reOrderLevel: 12,
      reOrderQty: 25
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: false,
        autoEntry: true,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: true,
        serialNo: true
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Samsung'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 9,
      addition: 540,
      barcode: '7890123456789'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD008',
      name: 'Gaming Mouse Pad',
      otherLanguage: 'गेमिंग माउस पैड',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 35,
      pRate: 300,
      cost: 250,
      sRate: 400,
      nRate: 450,
      mrp: 500,
      wRate: 350
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 200,
      minimumStock: 40,
      maximumStock: 400,
      reOrderLevel: 50,
      reOrderQty: 100
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: true,
        autoEntry: false,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: false,
        serialNo: false
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Razer'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 17,
      addition: 42.5,
      barcode: '8901234567890'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD009',
      name: 'USB-C Hub',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 28,
      pRate: 1800,
      cost: 1500,
      sRate: 2200,
      nRate: 2400,
      mrp: 2500,
      wRate: 2000
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 90,
      minimumStock: 18,
      maximumStock: 180,
      reOrderLevel: 25,
      reOrderQty: 45
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: false,
        autoEntry: true,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: true,
        serialNo: false
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Anker'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 14,
      addition: 210,
      barcode: '9012345678901'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD010',
      name: 'Wireless Charger',
      otherLanguage: 'वायरलेस चार्जर',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 32,
      pRate: 1200,
      cost: 1000,
      sRate: 1500,
      nRate: 1600,
      mrp: 1800,
      wRate: 1300
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 150,
      minimumStock: 30,
      maximumStock: 300,
      reOrderLevel: 40,
      reOrderQty: 75
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: true,
        autoEntry: false,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: false,
        serialNo: false
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Belkin'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 16,
      addition: 160,
      barcode: '0123456789012'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD011',
      name: 'Laptop Stand',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 26,
      pRate: 1500,
      cost: 1200,
      sRate: 1800,
      nRate: 1900,
      mrp: 2000,
      wRate: 1600
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 60,
      minimumStock: 12,
      maximumStock: 120,
      reOrderLevel: 15,
      reOrderQty: 30
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: false,
        autoEntry: true,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: true,
        serialNo: false
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Rain Design'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 13,
      addition: 156,
      barcode: '1234509876543'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD012',
      name: 'Noise Cancelling Headphones',
      otherLanguage: 'नॉइज़ कैंसलिंग हेडफोन',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 19,
      pRate: 8000,
      cost: 7000,
      sRate: 9000,
      nRate: 9500,
      mrp: 10000,
      wRate: 8500
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 35,
      minimumStock: 7,
      maximumStock: 70,
      reOrderLevel: 10,
      reOrderQty: 20
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: false,
        autoEntry: false,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: true,
        serialNo: true
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'Bose'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 10,
      addition: 700,
      barcode: '2345610987654'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD013',
      name: 'Portable Speaker',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 24,
      pRate: 3200,
      cost: 2600,
      sRate: 3800,
      nRate: 4000,
      mrp: 4500,
      wRate: 3500
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 70,
      minimumStock: 14,
      maximumStock: 140,
      reOrderLevel: 18,
      reOrderQty: 35
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: true,
        autoEntry: true,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: false,
        serialNo: false
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'JBL'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 12,
      addition: 312,
      barcode: '3456721098765'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD014',
      name: 'Tablet Stand',
      otherLanguage: 'टैबलेट स्टैंड',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 33,
      pRate: 600,
      cost: 500,
      sRate: 750,
      nRate: 800,
      mrp: 900,
      wRate: 650
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 180,
      minimumStock: 35,
      maximumStock: 350,
      reOrderLevel: 45,
      reOrderQty: 90
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: true,
        autoEntry: false,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: false,
        serialNo: false
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'UGreen'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 17,
      addition: 85,
      barcode: '4567832109876'
    }
  },
  {
    basicProductInfo: {
      code: 'PRD015',
      name: 'Network Switch 8-Port',
      taxGroup: REFERENCE_IDS.taxGroup
    },
    pricingAndRates: {
      profitPercentage: 21,
      pRate: 3500,
      cost: 3000,
      sRate: 4000,
      nRate: 4200,
      mrp: 4500,
      wRate: 3800
    },
    stockAndMeasurement: {
      base: REFERENCE_IDS.base,
      purchase: REFERENCE_IDS.purchase,
      sales: REFERENCE_IDS.sales,
      stock: REFERENCE_IDS.stock,
      openingStock: 25,
      minimumStock: 5,
      maximumStock: 50,
      reOrderLevel: 8,
      reOrderQty: 15
    },
    productProperties: {
      generalSettings: {
        inactive: false,
        lessProfit: false,
        counterItem: false,
        autoEntry: true,
        hideFromDevice: false,
        expiry: 0,
        taxInclusive: true,
        serialNo: true
      },
      categorization: {
        group: REFERENCE_IDS.group,
        subGroup: REFERENCE_IDS.subGroup,
        vendor: REFERENCE_IDS.vendor,
        brand: 'TP-Link'
      }
    },
    additionalDetails: {
      packUnit: 1,
      additionPercentage: 11,
      addition: 330,
      barcode: '5678943210987'
    }
  }
];