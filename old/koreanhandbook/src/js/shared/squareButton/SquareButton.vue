<template>
    <button 
    class="button"
    @click=buttonClicked
    v-bind:class="{ clicked: clicked }"
    >
    {{ text }}
    </button>
</template>

<script src="./SquareButton.js"></script>
