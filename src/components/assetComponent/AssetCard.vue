<template>
    <div>
        <div class="assetCard">
        <div class="infoCard" v-on:click="infoAsset()">(?)</div>
        <p>{{asset.label}} <i><small>{{asset.ticker}}</small></i> </p>
        <p v-if="!isEditingQty">Quantité : {{asset.quantity}}</p>
        <div v-else>
            Quantité : <input type="text" placeholder="asset.label" value="asset" />
            <span>OK</span>
        </div>
        <p>Montant investit : {{asset.invested_amount}}</p>
        <p>PRU : {{asset.invested_amount/asset.quantity}}</p>
    </div>
    </div>
</template>

<script>

export default {
    name: 'AssetCard',
    props: ['asset'],
    data(){
        return{
            uri: "http://localhost:3000",
            isEditingQty: true
        }
    },
}
</script>

<style scoped>

.assetCard{
    border: thin solid black;
    min-height: 30vmin;
    min-width: 60vmin;
    max-height: 60vmin;
    max-width: 70vmin;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-size: large;
    margin-bottom: 10%;
}

.infoCard{
    align-self: flex-end;
    margin-right: 2%;
    margin-top: 1%;
    cursor: pointer;
}

</style>



