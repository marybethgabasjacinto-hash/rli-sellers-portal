/* =========================================
   RLI SELLERS PORTAL
   INVENTORY SYSTEM
========================================= */


/* =========================================
   SHOW MIDDLE HOUSING
========================================= */

function showHousing() {

    document.getElementById("housingSection").style.display = "block";

    document.getElementById("condoSection").style.display = "none";

    document.getElementById("inventorySection").style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   SHOW MIDDLE CONDO
========================================= */

function showCondo() {

    document.getElementById("housingSection").style.display = "none";

    document.getElementById("condoSection").style.display = "block";

    document.getElementById("inventorySection").style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   OPEN PROJECT
========================================= */

function openProject(projectName) {

    document.getElementById("projectsSection").style.display = "none";

    document.getElementById("inventorySection").style.display = "block";

    document.getElementById("selectedProject").innerText = projectName;

    loadInventory(projectName);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   LOAD INVENTORY
========================================= */

function loadInventory(projectName) {

    const container =
        document.getElementById("inventoryContainer");

    container.innerHTML = "";


    /* =====================================
       MIDDLE HOUSING
    ===================================== */

    let housingData =
        INVENTORY_DATA.middleHousing.filter(function(unit) {

            return unit.project === projectName;

        });


    if (housingData.length > 0) {

        renderHousingInventory(
            housingData,
            container
        );

    }


    /* =====================================
       MIDDLE CONDO
    ===================================== */

    let condoData =
        INVENTORY_DATA.middleCondo.filter(function(unit) {

            return unit.project === projectName;

        });


    if (condoData.length > 0) {

        renderCondoInventory(
            condoData,
            container
        );

    }


    /* =====================================
       NO INVENTORY
    ===================================== */

    if (
        housingData.length === 0 &&
        condoData.length === 0
    ) {

        container.innerHTML = `
            <div class="block-card">

                <h3>No Available Inventory</h3>

                <p>
                    There are currently no available units
                    for this project.
                </p>

            </div>
        `;

    }

}


/* =========================================
   RENDER MIDDLE HOUSING
========================================= */

function renderHousingInventory(data, container) {

    const blocks = {};


    /* GROUP BY BLOCK */

    data.forEach(function(unit) {

        if (!blocks[unit.block]) {

            blocks[unit.block] = [];

        }

        blocks[unit.block].push(unit);

    });


    /* CREATE BLOCKS */

    Object.keys(blocks).forEach(function(blockName) {

        const blockCard =
            document.createElement("div");

        blockCard.className = "block-card";


        blockCard.innerHTML = `

            <h3>${blockName}</h3>

            <div class="lot-grid"></div>

        `;


        const lotGrid =
            blockCard.querySelector(".lot-grid");


        blocks[blockName].forEach(function(unit) {

            const lotButton =
                document.createElement("button");

            lotButton.className = "lot";

            lotButton.innerText =
                unit.lot.replace("Lot ", "");


            lotButton.onclick = function() {

                showHousingDetails(unit);

            };


            lotGrid.appendChild(lotButton);

        });


        container.appendChild(blockCard);

    });

}


/* =========================================
   RENDER MIDDLE CONDO
========================================= */

function renderCondoInventory(data, container) {

    const condoCard =
        document.createElement("div");

    condoCard.className = "block-card";


    condoCard.innerHTML = `

        <h3>AVAILABLE UNITS</h3>

        <div class="lot-grid"></div>

    `;


    const lotGrid =
        condoCard.querySelector(".lot-grid");


    data.forEach(function(unit) {

        const unitButton =
            document.createElement("button");

        unitButton.className = "lot";

        unitButton.innerText =
            unit.unitCode;


        unitButton.onclick = function() {

            showCondoDetails(unit);

        };


        lotGrid.appendChild(unitButton);

    });


    container.appendChild(condoCard);

}


/* =========================================
   MIDDLE HOUSING DETAILS
========================================= */

function showHousingDetails(unit) {

    document.getElementById("detailProject").innerText =
        unit.project;

    document.getElementById("detailLotAlias").innerText =
        unit.lotAlias;

    document.getElementById("detailBlock").innerText =
        unit.block;

    document.getElementById("detailLot").innerText =
        unit.lot;

    document.getElementById("detailLotArea").innerText =
        unit.lotArea + " sqm";

    document.getElementById("detailFloorArea").innerText =
        unit.floorArea + " sqm";

    document.getElementById("detailHouseModel").innerText =
        unit.houseModel;

    document.getElementById("detailPrice").innerText =
        formatPrice(unit.grossContractPrice);


    document.getElementById("unitModal").style.display =
        "flex";

}


/* =========================================
   MIDDLE CONDO DETAILS
========================================= */

function showCondoDetails(unit) {

    document.getElementById("detailProject").innerText =
        unit.project;

    document.getElementById("detailLotAlias").innerText =
        unit.lotAlias;

    document.getElementById("detailBlock").innerText =
        unit.buildingFloor;

    document.getElementById("detailLot").innerText =
        unit.unitCode;

    document.getElementById("detailLotArea").innerText =
        "N/A";

    document.getElementById("detailFloorArea").innerText =
        unit.floorArea + " sqm";

    document.getElementById("detailHouseModel").innerText =
        unit.unitModel;

    document.getElementById("detailPrice").innerText =
        formatPrice(unit.grossContractPrice);


    document.getElementById("unitModal").style.display =
        "flex";

}


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return "₱" +
        Number(price).toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


/* =========================================
   CLOSE UNIT DETAILS
========================================= */

function closeUnitDetails() {

    document.getElementById("unitModal").style.display =
        "none";

}


/* =========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================= */

function closeOutside(event) {

    if (
        event.target ===
        document.getElementById("unitModal")
    ) {

        closeUnitDetails();

    }

}


/* =========================================
   PAYMENT CALCULATOR
========================================= */

function openPaymentCalculator() {

    alert(
        "PAYMENT CALCULATOR\n\n" +
        "Next step: ikokonekta natin dito " +
        "ang actual Payment Calculator."
    );

}


/* =========================================
   HOLD UNIT
========================================= */

function holdUnit() {

    let project =
        document.getElementById("detailProject").innerText;

    let lotAlias =
        document.getElementById("detailLotAlias").innerText;

    let block =
        document.getElementById("detailBlock").innerText;

    let lot =
        document.getElementById("detailLot").innerText;


    alert(
        "HOLD THIS UNIT\n\n" +

        "Project: " +
        project +

        "\nLot Alias: " +
        lotAlias +

        "\nBlock / Building: " +
        block +

        "\nLot / Unit: " +
        lot
    );

}


/* =========================================
   BACK TO PROJECTS
========================================= */

function backToProjects() {

    document.getElementById("inventorySection").style.display =
        "none";

    document.getElementById("projectsSection").style.display =
        "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
