<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";
    import { Label } from "$lib/components/ui/select/index.js";
    import { forValue, fruitLabelText, fruits } from "$lib/fruit";

    let value = $state("");

    const triggerContent = $derived(
        fruits.find((f) => f.value === value)?.label ?? "Select a fruit",
    );
</script>

<Label for={forValue}>{fruitLabelText}</Label>
<Select.Root type="single" name="favoriteFruit" bind:value>
    <Select.Trigger data-testid="selectFruit" class="w-[180px]">
        {triggerContent}
    </Select.Trigger>
    <Select.Content id={forValue}>
        <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {#each fruits as fruit (fruit.value)}
                <Select.Item
                    data-testid="select-{fruit.value}"
                    value={fruit.value}
                    label={fruit.label}
                    disabled={fruit.value === "grapes"}
                >
                    {fruit.label}
                </Select.Item>
            {/each}
        </Select.Group>
    </Select.Content>
</Select.Root>
