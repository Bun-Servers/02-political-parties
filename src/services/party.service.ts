import { PartiesStore } from "../store/parties.store";
import type { PoliticalParty } from "../types";
import { generateUUID } from "../utils/generate-uuid";

class PartyService {
  private readonly partiesStore: PartiesStore;

  constructor() {
    this.partiesStore = new PartiesStore();
  }

  getAll(): PoliticalParty[] {
    return this.partiesStore.getAll();
  }

  add(name: string, color: string, borderColor: string): PoliticalParty {
    const newParty: PoliticalParty = {
      id: generateUUID(),
      name,
      borderColor,
      color,
      votes: 0,
    };

    this.partiesStore.add(newParty);

    return newParty;
  }

  update(id: string, updates: Partial<PoliticalParty>): PoliticalParty | null {
    const party = this.partiesStore.findById(id);
    if (!party) return null;

    if (updates.name) party.name = updates.name;
    if (updates.color) party.color = updates.color;
    if (updates.borderColor) party.borderColor = updates.borderColor;

    return party;
  }

  delete(id: string): boolean {
    return this.partiesStore.delete(id);
  }

  incrementVotes(id: string): PoliticalParty | null {
    const party = this.partiesStore.findById(id);
    if (!party) return null;

    party.votes += 1;
    return party;
  }

  decrementVotes(id: string): PoliticalParty | null {
    const party = this.partiesStore.findById(id);
    if (!party) return null;

    if (party.votes <= 0) return party;

    party.votes -= 1;
    return party;
  }
}

export const partyService = new PartyService();
