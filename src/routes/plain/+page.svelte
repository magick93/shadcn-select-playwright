<script lang="ts">
    import { forValue, fruitLabelText, fruits } from "$lib/fruit";

</script>

<label for={forValue}>{fruitLabelText}</label>
<br />
<br />
<br />
<br />
<select data-testid="selectFruit" id={forValue} aria-describedby="fruit-description" aria-required="true" class="my-custom-select">
  
	<option value="">--Please choose an option--</option>
    {#each fruits as fruit}
      <option data-testid="select-{fruit.value}" value="{fruit.value}">{fruit.label}</option>
    {/each}

</select>

<style>
  .my-custom-select button {
    display: flex;
    align-items: center;
    gap: 1rem;
    border: none;
    background-color: transparent;
  }
  .my-custom-select .icon {
    border: none;
    margin: 0;
    padding: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: grid;
    place-content: center;
    background-color: buttonface;
  }
  .my-custom-select .icon::before {
    content: '\25BC';
  }
  .my-custom-select::picker(select) {
    padding: 0;
  }
  .my-custom-select .section {
    padding: 1rem 0 0;
    background: radial-gradient(ellipse 60% 50px at center top, #000a 0%, transparent 130%);
  }
  .my-custom-select h3 {
    margin: 0 0 1rem 0;
    text-align: center;
    color: white;
  }
  .my-custom-select option {
    text-align: center;
    padding: 0.5rem;
  }
  select, ::picker(select) {
    appearance: base-select;
  }
</style>