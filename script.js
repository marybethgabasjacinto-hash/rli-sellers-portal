/* =========================================
   RLI SELLERS PORTAL
   INVENTORY SYSTEM
========================================= */


/* =========================================
   OPEN PROJECT
========================================= */

function openProject(projectName) {

    const projectsSection =
        document.getElementById("projectsSection");

    const inventorySection =
        document.getElementById("inventorySection");

    const selectedProject =
        document.getElementById("selectedProject");

    const inventoryContainer =
        document.getElementById("inventoryContainer");


    if (!projectsSection) {
        alert("ERROR: projectsSection not found.");
        return;
    }

    if (!inventorySection) {
        alert("ERROR: inventorySection not found.");
        return;
    }

    if (!selectedProject) {
        alert("ERROR: selectedProject not found.");
        return;
    }

    if (!inventoryContainer) {
        alert("ERROR: inventoryContainer not found.");
        return;
    }

    if (typeof INVENTORY_DATA === "undefined") {

        alert(
            "ERROR: inventory-data.js is NOT loaded.\n\n" +
            "Check if inventory-data.js is connected before script.js."
        );

        return;
    }


    projectsSection.style.display = "none";

    inventorySection.style.display = "block";

    selectedProject.innerText = projectName;


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


    if (!container) {

        alert(
            "ERROR: inventoryContainer is missing."
        );

        return;
    }


    container.innerHTML = "";


    if (
        typeof INVENTORY_DATA === "undefined"
    ) {

        container.innerHTML = `
            <div class="block-card">
                <h3>Inventory Data Error</h3>
                <p>
                    inventory-data.js was not loaded.
                </p>
            </div>
        `;

        return;
    }


    /* =====================================
       MIDDLE HOUSING
    ===================================== */

    const housingData =
        Array.isArray(INVENTORY_DATA.middleHousing)
            ? INVENTORY_DATA.middleHousing.filter(function(unit) {

                return unit.project === projectName;

            })
            : [];


    /* =====================================
       MIDDLE CONDO
    ===================================== */

    const condoData =
        Array.isArray(INVENTORY_DATA.middleCondo)
            ? INVENTORY_DATA.middleCondo.filter(function(unit) {

                return unit.project === projectName;

            })
            : [];


    /* =====================================
       RENDER HOUSING
    ===================================== */

    if (housingData.length > 0) {

        renderHousingInventory(
            housingData,
            container
        );

    }


    /* =====================================
       RENDER CONDO
    ===================================== */

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
                    No inventory found for:
                    <strong>${projectName}</strong>
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


    data.forEach(function(unit) {

        const blockName =
            unit.block || "Block";


        if (!blocks[blockName]) {

            blocks[blockName] = [];

        }


        blocks[blockName].push(unit);

    });


    Object.keys(blocks).forEach(function(blockName) {

        const blockCard =
            document.createElement("div");


        blockCard.className =
            "block-card";


        blockCard.innerHTML = `

            <h3>${blockName}</h3>

            <div class="lot-grid"></div>

        `;


        const lotGrid =
            blockCard.querySelector(".lot-grid");


        blocks[blockName].forEach(function(unit) {

            const lotButton =
                document.createElement("button");


            lotButton.type =
                "button";


            lotButton.className =
                "lot";


            lotButton.innerText =
                String(unit.lot || "")
                    .replace(/^Lot\s*/i, "")
                    .replace(/^0+/, "") || "1";


            lotButton.addEventListener(
                "click",
                function() {

                    showHousingDetails(unit);

                }
            );


            lotGrid.appendChild(
                lotButton
            );

        });


        container.appendChild(
            blockCard
        );

    });

}


/* =========================================
   RENDER MIDDLE CONDO
========================================= */

function renderCondoInventory(data, container) {

    const condoCard =
        document.createElement("div");


    condoCard.className =
        "block-card";


    condoCard.innerHTML = `

        <h3>AVAILABLE UNITS</h3>

        <div class="lot-grid"></div>

    `;


    const lotGrid =
        condoCard.querySelector(".lot-grid");


    data.forEach(function(unit) {

        const unitButton =
            document.createElement("button");


        unitButton.type =
            "button";


        unitButton.className =
            "lot";


        unitButton.innerText =
            unit.unitCode;


        unitButton.addEventListener(
            "click",
            function() {

                showCondoDetails(unit);

            }
        );


        lotGrid.appendChild(
            unitButton
        );

    });


    container.appendChild(
        condoCard
    );

}


/* =========================================
   HOUSING DETAILS
========================================= */

function showHousingDetails(unit) {

    document.getElementById(
        "detailProject"
    ).innerText =
        unit.project || "";


    document.getElementById(
        "detailLotAlias"
    ).innerText =
        unit.lotAlias || "";


    document.getElementById(
        "detailBlock"
    ).innerText =
        unit.block || "";


    document.getElementById(
        "detailLot"
    ).innerText =
        unit.lot || "";


    document.getElementById(
        "detailLotArea"
    ).innerText =
        unit.lotArea + " sqm";


    document.getElementById(
        "detailFloorArea"
    ).innerText =
        unit.floorArea + " sqm";


    document.getElementById(
        "detailHouseModel"
    ).innerText =
        unit.houseModel || "";


    document.getElementById(
        "detailPrice"
    ).innerText =
        formatPrice(
            unit.grossContractPrice
        );


    document.getElementById(
        "unitModal"
    ).style.display =
        "flex";

}


/* =========================================
   CONDO DETAILS
========================================= */

function showCondoDetails(unit) {

    document.getElementById(
        "detailProject"
    ).innerText =
        unit.project || "";


    document.getElementById(
        "detailLotAlias"
    ).innerText =
        unit.lotAlias || "";


    document.getElementById(
        "detailBlock"
    ).innerText =
        unit.buildingFloor || "";


    document.getElementById(
        "detailLot"
    ).innerText =
        unit.unitCode || "";


    document.getElementById(
        "detailLotArea"
    ).innerText =
        "N/A";


    document.getElementById(
        "detailFloorArea"
    ).innerText =
        unit.floorArea + " sqm";


    document.getElementById(
        "detailHouseModel"
    ).innerText =
        unit.unitModel || "";


    document.getElementById(
        "detailPrice"
    ).innerText =
        formatPrice(
            unit.grossContractPrice
        );


    document.getElementById(
        "unitModal"
    ).style.display =
        "flex";

}


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return "₱" +
        Number(price || 0).toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


/* =========================================
   CLOSE POPUP
========================================= */

function closeUnitDetails() {

    const modal =
        document.getElementById(
            "unitModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


/* =========================================
   CLOSE OUTSIDE
========================================= */

function closeOutside(event) {

    const modal =
        document.getElementById(
            "unitModal"
        );


    if (
        modal &&
        event.target === modal
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
        "Next step: ikokonekta natin " +
        "ang actual Payment Calculator."
    );

}


/* =========================================
   HOLD UNIT
========================================= */

function holdUnit() {

    const project =
        document.getElementById(
            "detailProject"
        ).innerText;


    const lotAlias =
        document.getElementById(
            "detailLotAlias"
        ).innerText;


    const block =
        document.getElementById(
            "detailBlock"
        ).innerText;


    const lot =
        document.getElementById(
            "detailLot"
        ).innerText;


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

    const inventorySection =
        document.getElementById(
            "inventorySection"
        );


    const projectsSection =
        document.getElementById(
            "projectsSection"
        );


    if (inventorySection) {

        inventorySection.style.display =
            "none";

    }


    if (projectsSection) {

        projectsSection.style.display =
            "block";

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
