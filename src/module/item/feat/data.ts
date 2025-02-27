import { AttributeString } from "@actor/types.ts";
import { SelfEffectReference, SelfEffectReferenceSource } from "@item/ability/index.ts";
import { ActionType, BaseItemSourcePF2e, Frequency, FrequencySource, ItemSystemSource } from "@item/data/base.ts";
import { OneToThree, TraitsWithRarity } from "@module/data.ts";
import { FeatCategory, FeatTrait } from "./types.ts";

type FeatSource = BaseItemSourcePF2e<"feat", FeatSystemSource>;

interface PrerequisiteTagData {
    value: string;
}

interface FeatSystemSource extends ItemSystemSource {
    level: { value: number };
    traits: FeatTraits;
    /** The category of feat or feature of this item */
    category: FeatCategory;
    /** Whether this feat must be taken at character level 1 */
    onlyLevel1: boolean;
    /** The maximum number of times this feat can be taken by a character. A value of `null` indicates no limit */
    maxTakable: number | null;
    actionType: {
        value: ActionType;
    };
    actions: {
        value: OneToThree | null;
    };
    prerequisites: {
        value: PrerequisiteTagData[];
    };
    location: string | null;
    frequency?: FrequencySource;
    subfeatures?: Partial<FeatSubfeatures>;
    /** A self-applied effect for simple actions */
    selfEffect?: SelfEffectReferenceSource | null;
}

interface FeatSystemData extends Omit<FeatSystemSource, "maxTaken"> {
    /** `null` is set to `Infinity` during data preparation */
    maxTakable: number;
    frequency?: Frequency;
    subfeatures: FeatSubfeatures;
    /** A self-applied effect for simple actions */
    selfEffect: SelfEffectReference | null;
}

interface FeatSubfeatures {
    keyOptions: AttributeString[];
}

type FeatTraits = TraitsWithRarity<FeatTrait>;

export type { FeatSource, FeatSystemData, FeatSystemSource, FeatTraits, PrerequisiteTagData };
