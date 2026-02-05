
function testFilterLogic() {
    console.log("Starting Filter Logic Test...");

    // Mock Data
    const rows = [
        { id: "1", type: "Task", flags: ["Face Cam", "Body Cam", "Eye Cam"] },
        { id: "2", type: "Resting", flags: ["Face Cam"] },
        { id: "3", type: "Task", flags: [] } // No flags
    ];

    // Scenario 1: Uncheck all modalities (Empty selection)
    // Expectation: Should match NOTHING (if consistent with Session Type) or EVERYTHING (current behavior)
    // User complaint: "Even if all off, items pass through". Implies they want them NOT to pass.
    let selectedModalities = [];

    console.log("\nScenario 1: No modalities selected");
    rows.forEach(row => {
        let matchesModality = true;
        // Current Logic in database.html
        selectedModalities.forEach(mod => {
            if (!row.flags.includes(mod)) matchesModality = false;
        });

        console.log(`Row ${row.id} [${row.flags}]: Matches? ${matchesModality}`);
        if (matchesModality) console.log("  -> PASSED (Current Behavior - likely unintended)");
    });

    // Proposed Fix Logic: Treat empty selection as "Match None"
    console.log("\nScenario 1 (Fixed): No modalities selected -> Should match NONE");
    rows.forEach(row => {
        let matchesModality = false; // Default to false
        if (selectedModalities.length > 0) {
            // OR Logic? OR AND Logic?
            // Let's test AND first (Has ALL selected)
            let hasAll = true;
            selectedModalities.forEach(mod => {
                if (!row.flags.includes(mod)) hasAll = false;
            });
            matchesModality = hasAll;
        } else {
            // If no modalities selected, show nothing
            matchesModality = false;
        }

        console.log(`Row ${row.id} [${row.flags}]: Matches? ${matchesModality}`);
    });

    // Scenario 2: Select 'Face Cam'
    selectedModalities = ['Face Cam'];
    console.log("\nScenario 2: Select 'Face Cam'");
    rows.forEach(row => {
        // Fix Logic
        let matchesModality = false;
        if (selectedModalities.length > 0) {
            let hasAll = true;
            selectedModalities.forEach(mod => {
                if (!row.flags.includes(mod)) hasAll = false;
            });
            matchesModality = hasAll;
        }
        console.log(`Row ${row.id} [${row.flags}]: Matches? ${matchesModality}`);
    });
}

testFilterLogic();
