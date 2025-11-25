<template>
    <div class="faqPage">
        <BaseCard title="Frequently Asked Questions" background-color="var(--accent)" :style="{ '--card-content-width': '85%' }">
            <template #content>
                <div class="search-bar">
                    <form>
                        <SearchInput :placeholder="'How can we help?'"/>
                    </form>
                </div>
                <AccordionTable :data="faqData" :header-bg-color="'var(--light-blue)'"
                    :body-bg-color="'var(--light-blue2)'" :font-weight="'normal'" :justify-content="'flex-start'"
                    :text-align="'left'" width="100%" :max-height="'40vh'" />
            </template>
        </BaseCard>
    </div>
</template>

<script setup>
import AccordionTable from "@/components/AccordionTable/AccordionContainer.vue";
import BaseCard from "@/components/Cards/BaseCard.vue";
import SearchInput from "@/components/SearchInput.vue";

const faqData = [
    {
        category: "1. What is this platform for?",
        subcategories: ["This platform allows users to analyze and visualize Airbnb data from different cities. It helps identify trends, occupancy rates, average prices, and the overall impact of short-term rentals on local housing markets"]
    },
    {
        category: "2. How can I navigate through the platform?",
        subcategories: ["You can use the main navigation menu to move between sections such as Dashboard, Maps and Statistics. Each page provides interactive filters and visualizationsfor easier exploration of data"]
    },
    {
        category: "3. Can I filter the data by city or property type?",
        subcategories: ["Yes. The filter panel allows you to select property types, price ranges and availability periods. You can algo search for new cities to view their statistics. The charts and maps update automatically based on your selections "]
    },
    {
        category: "4. How can I export data or charts?",
        subcategories: ["Use the Export button on charts to export them as PNG or PDF files, and on tables to export as CSV or JSON files."]
    },
    {
        category: "5. What do the different colors on the map represent?",
        subcategories: ["Colors indicate alert statuses. For example, red pins highlight properties with more than 300 occupied days per year, signaling unusually high activity that may require further inspection. You can hover over any zone to view detailed information in a tooltip."]
    },
    {
        category: "6. Can I compare data between two cities?",
        subcategories: ["Yes. In the Comparison section, you can select two cities to compare metrics such as number of listings, hosts, or average prices."]
    },
    {
        category: "7. How can I reset all filters?",
        subcategories: ["Click the “Reset” button in the filter panel to restore default settings and view all available data."]
    },
    {
        category: "8. What should I do if I can´t log in or forgot my password?",
        subcategories: ["Click “Forgot Password” on the login page and follow the instructions to reset your password. If the issue continues, contact our support team."]
    },
    {
        category: "9. Where can I find more information about the data sources?",
        subcategories: ["All data comes from the InsideAirbnb project. You can learn more at insideairbnb.com, which provides open datasets and methodological details."]
    },
    {
        category: "10. How can I contact support?",
        subcategories: ["You can reach us through the Contact page or by emailing our support team. We’ll respond as soon as possible."]
    },
];
</script>

<style scoped>
.faqPage {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-bar {
    margin-bottom: 20px;
}

#faq-content {
    width: 85%;
}

input {
    width: 70%;
    height: 60px;
    border-radius: 30px;
    background-color: var(--light-blue);
    background-image: url('@/assets/glass.png');
    background-repeat: no-repeat;
    background-position: right 20px center;
    background-size: 40px;
}

input::placeholder {
  color: var(--white);
  font-weight: 150;
  font-size: 20px;
}

</style>