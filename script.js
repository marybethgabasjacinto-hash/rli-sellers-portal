/* =========================================
   RLI SELLERS PORTAL
   INVENTORY SYSTEM
========================================= */


/* =========================================
   CHECK INVENTORY DATA
========================================= */

function checkInventoryData() {

    if (typeof INVENTORY_DATA === "undefined") {

        alert(
            "ERROR: inventory-data.js is not loaded.\n\n" +
            "Make sure this is connected BEFORE script.js."
        );

        return false;
    }

    return true;
}


/* =========================================
   SHOW MIDDLE HOUSING
========================================= */

function showHousing() {

    const housingSection =
        document.getElementById("housingSection");

    const condoSection =
        document.getElementById("condoSection");

    const inventorySection =
        document.getElementById("inventorySection");

    if (!housingSection) {
        alert("ERROR: housingSection not found.");
        return;
    }

    housingSection.style.display = "block";

    if (condoSection) {
        condoSection.style.display = "none";
    }

    if (inventorySection) {
        inventorySection.style.display = "none";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   SHOW MIDDLE CONDO
========================================= */

function showCondo() {

    const housingSection =
        document.getElementById("housingSection");

    const condoSection =
        document.getElementById("condoSection");

    const inventorySection =
        document.getElementById("inventorySection");

    if (!condoSection) {
        alert("ERROR: condoSection not found.");
        return;
    }

    condoSection.style.display = "block";

    if (housingSection) {
        housingSection.style.display = "none";
    }

    if (inventorySection) {
        inventorySection.style.display = "none";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   OPEN PROJECT
========================================= */

function openProject(projectName) {

    if (!checkInventoryData()) {
        return;
    }

    const housingSection =
        document.getElementById("housingSection");

    const condoSection =
        document.getElementById("condoSection");

    const projectsSection =
        document.getElementById("projectsSection");

    const inventorySection =
        document.getElementById("inventorySection");

    const selectedProject =
        document.getElementById("selectedProject");

    const inventoryContainer =
        document.getElementById("inventoryContainer");


    if (!inventorySection) {
        alert("ERROR: inventorySection not found.");
        return;
    }

    if (!selectedProject) {
        alert("ERROR: selectedProject not found.");
        return;
    }

    if (!inventoryContainer) {
        alert(
            "ERROR: inventoryContainer not found.\n\n" +
            "Please add <div id=\"inventoryContainer\"></div> " +
            "inside inventorySection."
        );

        return;
    }


    /* HIDE PROJECT SECTIONS */

    if (projectsSection) {
        projectsSection.style.display = "none";
    }

    if (housingSection) {
        housingSection.style.display = "none";
    }

    if (condoSection) {
        condoSection.style.display = "none";
    }


    /* SHOW INVENTORY */

    inventorySection.style.display = "block";

    selectedProject.innerText =
        projectName;


    /* LOAD DATA */

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
        return;
    }

    container.innerHTML = "";


    /* =====================================
       MIDDLE HOUSING
    ===================================== */

    const housingData =
        Array.isArray(INVENTORY_DATA.middleHousing)
            ? INVENTORY_DATA.middleHousing.filter(
                function(unit) {

                    return (
                        unit.project &&
                        unit.project.trim().toUpperCase() ===
                        projectName.trim().toUpperCase()
                    );

                }
            )
            : [];


    /* =====================================
       MIDDLE CONDO
    ===================================== */

    const condoData =
        Array.isArray(INVENTORY_DATA.middleCondo)
            ? INVENTORY_DATA.middleCondo.filter(
                function(unit) {

                    return (
                        unit.project &&
                        unit.project.trim().toUpperCase() ===
                        projectName.trim().toUpperCase()
                    );

                }
            )
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

function renderHousingInventory(
    data,
    container
) {

    const blocks = {};


    /* GROUP BY BLOCK */

    data.forEach(function(unit) {

        const blockName =
            unit.block || "Block";

        if (!blocks[blockName]) {
            blocks[blockName] = [];
        }

        blocks[blockName].push(unit);

    });


    /* CREATE BLOCK CARDS */

    Object.keys(blocks).forEach(
        function(blockName) {

            const blockCard =
                document.createElement("div");

            blockCard.className =
                "block-card";


            blockCard.innerHTML = `

                <h3>${blockName}</h3>

                <div class="lot-grid"></div>

            `;


            const lotGrid =
                blockCard.querySelector(
                    ".lot-grid"
                );


            /* CREATE LOT BUTTONS */

            blocks[blockName].forEach(
                function(unit) {

                    const lotButton =
                        document.createElement(
                            "button"
                        );

                    lotButton.type =
                        "button";

                    lotButton.className =
                        "lot";


                    const lotNumber =
                        String(
                            unit.lot || ""
                        )
                        .replace(
                            /^Lot\s*/i,
                            ""
                        )
                        .replace(
                            /^0+/,
                            ""
                        );


                    lotButton.innerText =
                        lotNumber || "1";


                    lotButton.onclick =
                        function() {

                            showHousingDetails(
                                unit
                            );

                        };


                    lotGrid.appendChild(
                        lotButton
                    );

                }
            );


            container.appendChild(
                blockCard
            );

        }
    );
}


/* =========================================
   RENDER MIDDLE CONDO
========================================= */

function renderCondoInventory(
    data,
    container
) {

    const condoCard =
        document.createElement("div");

    condoCard.className =
        "block-card";


    condoCard.innerHTML = `

        <h3>AVAILABLE UNITS</h3>

        <div class="lot-grid"></div>

    `;


    const lotGrid =
        condoCard.querySelector(
            ".lot-grid"
        );


    data.forEach(function(unit) {

        const unitButton =
            document.createElement(
                "button"
            );

        unitButton.type =
            "button";

        unitButton.className =
            "lot";

        unitButton.innerText =
            unit.unitCode;


        unitButton.onclick =
            function() {

                showCondoDetails(
                    unit
                );

            };


        lotGrid.appendChild(
            unitButton
        );

    });


    container.appendChild(
        condoCard
    );
}


/* =========================================
   MIDDLE HOUSING DETAILS
========================================= */

function showHousingDetails(unit) {

    const housingDetails =
        document.getElementById(
            "housingDetails"
        );

    const condoDetails =
        document.getElementById(
            "condoDetails"
        );


    if (housingDetails) {
        housingDetails.style.display =
            "block";
    }

    if (condoDetails) {
        condoDetails.style.display =
            "none";
    }


    setText(
        "detailProject",
        unit.project
    );

    setText(
        "detailLotAlias",
        unit.lotAlias
    );

    setText(
        "detailBlock",
        unit.block
    );

    setText(
        "detailLot",
        unit.lot
    );

    setText(
        "detailLotArea",
        unit.lotArea + " sqm"
    );

    setText(
        "detailFloorArea",
        unit.floorArea + " sqm"
    );

    setText(
        "detailHouseModel",
        unit.houseModel
    );

    setText(
        "detailPrice",
        formatPrice(
            unit.grossContractPrice
        )
    );


    openModal();
}


/* =========================================
   MIDDLE CONDO DETAILS
========================================= */

function showCondoDetails(unit) {

    const housingDetails =
        document.getElementById(
            "housingDetails"
        );

    const condoDetails =
        document.getElementById(
            "condoDetails"
        );


    if (housingDetails) {
        housingDetails.style.display =
            "none";
    }

    if (condoDetails) {
        condoDetails.style.display =
            "block";
    }


    setText(
        "condoProject",
        unit.project
    );

    setText(
        "condoLotAlias",
        unit.lotAlias
    );

    setText(
        "condoBuildingFloor",
        unit.buildingFloor
    );

    setText(
        "condoUnitCode",
        unit.unitCode
    );

    setText(
        "condoFloorArea",
        unit.floorArea + " sqm"
    );

    setText(
        "condoUnitModel",
        unit.unitModel
    );

    setText(
        "condoPrice",
        formatPrice(
            unit.grossContractPrice
        )
    );


    openModal();
}


/* =========================================
   SET TEXT HELPER
========================================= */

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );

    if (element) {

        element.innerText =
            value || "";

    }
}


/* =========================================
   OPEN MODAL
========================================= */

function openModal() {

    const modal =
        document.getElementById(
            "unitModal"
        );

    if (modal) {

        modal.style.display =
            "flex";

    } else {

        alert(
            "ERROR: unitModal not found."
        );

    }
}


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return "₱" +
        Number(
            price || 0
        ).toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
}


/* =========================================
   CLOSE MODAL
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
   CLOSE WHEN CLICKING OUTSIDE
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
        )?.innerText || "";


    const lotAlias =
        document.getElementById(
            "detailLotAlias"
        )?.innerText || "";


    const block =
        document.getElementById(
            "detailBlock"
        )?.innerText || "";


    const lot =
        document.getElementById(
            "detailLot"
        )?.innerText || "";


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
   BACK TO PROJECT TYPE
========================================= */

function backToProjects() {

    const inventorySection =
        document.getElementById(
            "inventorySection"
        );

    const housingSection =
        document.getElementById(
            "housingSection"
        );

    const condoSection =
        document.getElementById(
            "condoSection"
        );


    if (inventorySection) {
        inventorySection.style.display =
            "none";
    }

    /*
       Hindi muna projectsSection.
       Ibalik natin sa product type/project
       structure depende sa current HTML.
    */

    if (housingSection) {
        housingSection.style.display =
            "block";
    }

    if (condoSection) {
        condoSection.style.display =
            "none";
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   PAGE READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "RLI Sellers Portal loaded."
        );

        console.log(
            "INVENTORY_DATA:",
            typeof INVENTORY_DATA !==
            "undefined"
        );

    }
);
